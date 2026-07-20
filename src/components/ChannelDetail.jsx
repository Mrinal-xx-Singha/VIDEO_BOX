import React from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "./utils/fetchFromAPI";
import { useQuery } from "@tanstack/react-query";

const ChannelDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['channelDetail', id],
    queryFn: async () => {
      const channelData = await fetchFromAPI(`channel?id=${id}`);
      
      // The API strips channelName/channelId from videos when fetching a channel.
      // We must inject them back so VideoCard doesn't default to "JavaScript Mastery"!
      const videos = channelData.contents?.filter((item) => item.video).map((item) => {
        item.video.channelName = channelData.title;
        item.video.channelId = id;
        return item;
      }) || [];

      return {
        channelDetail: channelData,
        videos: videos
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  const channelDetail = data?.channelDetail;
  const videos = data?.videos || [];
  console.log(channelDetail)

  if (isError) {
    return (
      <Typography color="#ff8a80" textAlign="center" minHeight="70vh" pt={10}>
        Failed to load channel details.
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Box minHeight="70vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress sx={{ color: "var(--brand)" }} />
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          minHeight: { xs: 140, md: 180 },
          borderRadius: 4,
          background:
            "linear-gradient(90deg, #2b2b2b 0%, #1f1f1f 45%, #171717 100%)",
          border: "1px solid var(--border)",
        }}
      />

      <ChannelCard channelDetail={channelDetail} marginTop={{ xs: 0, md: -70 }} />

      <Box>
        <Typography sx={{ color: "var(--text-secondary)", fontSize: "0.82rem", mb: 0.5 }}>
          Latest uploads
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: "1.45rem", md: "1.9rem" }, fontWeight: 700, letterSpacing: "-0.02em", mb: 2 }}
        >
          Videos
        </Typography>
        <Videos videos={videos} isLoading={isLoading}/>
      </Box>
    </Stack>
  );
};

export default ChannelDetail;
