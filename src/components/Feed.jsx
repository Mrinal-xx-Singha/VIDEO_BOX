import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "./utils/fetchFromAPI";
import { Sidebar, Videos } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [channelAvatars, setChannelAvatars] = useState({})

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setVideos(null);
      setError(null);

      try {
        const data = await fetchFromAPI(`search?query=${selectedCategory}`);

        setVideos(data.contents || []);

        const videoItems = (data.contents || []).filter((item) => item?.video)
        const uniqueChannelIds = [...new Set(videoItems.map((item) => item.video.channelId).filter(Boolean))]

        const avatarEntries = await Promise.all(
          uniqueChannelIds.map(async (channelId) => {
            const channelData = await fetchFromAPI(`channel?id=${channelId}`)
            return [
              channelId,
              channelData?.avatar?.thumbnails?.[0]?.url || "",
            ];
          })
        )
        setChannelAvatars(Object.fromEntries(avatarEntries))
      } catch (err) {
        setError("Failed to fetch videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedCategory]);



  return (
    <Stack direction={{ xs: "column", lg: "row" }} spacing={{ xs: 2, md: 3, lg: 3 }}>
      <Box sx={{ width: { xs: "100%", lg: 220 }, flexShrink: 0 }}>
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

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="45vh">
            <CircularProgress sx={{ color: "var(--brand)" }} />
          </Box>
        ) : error ? (
          <Typography sx={{ color: "#ff8a80", py: 6, textAlign: "center" }}>
            {error}
          </Typography>
        ) : (
          <Videos videos={videos} channelAvatars={channelAvatars} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
