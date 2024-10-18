import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, direction = "row" }) => {
  if (!videos?.length) {
    return (
      <Typography
        color="#fff"
        variant="h6"
        textAlign="center"
        minHeight="100vh"
      >
        Loading...
      </Typography>
    );
  }

  return (
    <Stack
      direction={direction}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="start"
      gap={2}
    >
      {videos.map((item, index) => {
        // Safeguard checks for nested properties
        const videoId = item?.id?.videoId;
        const channelId = item?.id?.channelId;

        return (
          <Box key={videoId || channelId || index}>
            {videoId && <VideoCard video={item} />}
            {channelId && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Videos;
