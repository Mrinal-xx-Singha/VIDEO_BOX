"use server";

import axios from 'axios';

const BASE_URL = 'https://youtube-search-and-download.p.rapidapi.com';

// Server-side in-memory cache to preserve RapidAPI quota and speed up feeds
const avatarCache = new Map();

export const fetchFromAPI = async (url) => {
  // Next.js native fetch requires a fully constructed URL string with params
  const targetUrl = new URL(`${BASE_URL}/${url}`);
  if (!targetUrl.searchParams.has('maxResults')) {
    targetUrl.searchParams.append('maxResults', '50');
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY || process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    },
    // CRITICAL FIX: Cache the result on Vercel Edge for 24 hours!
    next: { revalidate: 86400 } 
  };

  const response = await fetch(targetUrl.toString(), options);
  const data = await response.json();
  return data;
};

export const fetchFeedVideos = async (category) => {
  try {
    const searchData = await fetchFromAPI(`search?query=${category}`);
    const videoList = searchData?.contents || [];

    const videoItems = videoList.filter((item) => item?.video);
    const uniqueChannelIds = [...new Set(videoItems.map((item) => item.video.channelId).filter(Boolean))];

    // Fetch at most 10 new uncached channel avatars per request to protect API quota and avoid timeout
    const channelsToFetch = uniqueChannelIds.filter((id) => !avatarCache.has(id)).slice(0, 10);

    await Promise.all(
      channelsToFetch.map(async (channelId) => {
        try {
          const channelData = await fetchFromAPI(`channel?id=${channelId}`);
          const avatarUrl = channelData?.avatar?.thumbnails?.[0]?.url || "";
          if (avatarUrl) avatarCache.set(channelId, avatarUrl);
        } catch (err) {
          console.error(`Failed to cache avatar for channel ${channelId}:`, err?.message);
        }
      })
    );

    const channelAvatars = {};
    uniqueChannelIds.forEach((id) => {
      channelAvatars[id] = avatarCache.get(id) || "";
    });

    return {
      videos: videoList,
      channelAvatars,
    };
  } catch (error) {
    console.error("Error fetching feed videos:", error?.message);
    throw error;
  }
};

