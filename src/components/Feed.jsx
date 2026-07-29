"use client";

import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "./utils/fetchFromAPI";
import { Sidebar, Videos } from "./";
import { useQuery } from "@tanstack/react-query";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");

  const {data,isLoading,isError}=useQuery({
    queryKey:['videos',selectedCategory],
    queryFn:async()=>{
      // fetch videos
      const searchData = await fetchFromAPI(`search?query=${selectedCategory}`)
      const videoList = searchData?.contents || []

      // Fetch the channel avatars 
      const videoItems = videoList.filter((item)=>item?.video)
      const uniqueChannelIds = [...new Set(videoItems.map((item)=>item.video.channelId).filter(Boolean))]

      const avatarEntries = await Promise.all(
        uniqueChannelIds.map(async(channelId)=>{
          const channelData = await fetchFromAPI(`channel?id=${channelId}`)
          return [channelId,channelData?.avatar?.thumbnails?.[0]?.url || ""]
        })
      )
      return {
        videos:videoList,
        channelAvatars:Object.fromEntries(avatarEntries)
      }
    },
    staleTime:1000*60*5 //Keep the data fresh in cache for 5 minutes
  })

  const videos = data?.videos || []
  const channelAvatars = data?.channelAvatars || {}
  return (
    <Stack direction={{ xs: "column", lg: "row" }} spacing={{ xs: 2, md: 3, lg: 3 }}>
      <Box sx={{ 
        width: { xs: "100%", lg: 220 }, 
        flexShrink: 0,
        position: { lg: "sticky" },
        top: "80px", // offset for the navbar
        height: { lg: "calc(100vh - 80px)" },
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "block" } 
      }}>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ px: { xs: 0.5, md: 1 }, pb: 2 }}>
          <Typography sx={{ color: "var(--text-secondary)", fontSize: "0.82rem", mb: 0.5 }}>
            Recommended
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.5rem", md: "1.9rem" },
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {selectedCategory}
          </Typography>
        </Box>

        {isError ? (
          <Typography sx={{ color: "#ff8a80", py: 6, textAlign: "center" }}>
            Failed to load vides. please try again 
          </Typography>
        ) : (
          <Videos videos={videos} channelAvatars={channelAvatars} isLoading={isLoading} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
