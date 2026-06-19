import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { VideoCard } from "./";

const Videos = ({ videos, direction = "row" }) => {
  if (!videos?.length) {
    return (
      <Typography
        color="#fff"
        variant="h6"
        textAlign="center"
      >
        No videos found
      </Typography>
    );
  }

  return (
    <Stack
      direction={direction}
      flexWrap="wrap"
      justifyContent="center"
      gap={2}
    >
      {videos.filter((item)=>item.video).map((item, index) => (
        <Box
          key={item?.video?.videoId || index}
        >
          <VideoCard video={item} />
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;