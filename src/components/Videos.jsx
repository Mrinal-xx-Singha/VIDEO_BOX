import React from "react";
import { Box, Typography } from "@mui/material";

import { VideoCard } from "./";

const Videos = ({ videos, direction = "row",channelAvatars={} }) => {
  const filteredVideos = videos?.filter((item) => item?.video) || [];
  const compact = direction === "column";

  if (!filteredVideos.length) {
    return (
      <Typography color="var(--text-secondary)" variant="h6" textAlign="center" py={6}>
        No videos found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: compact
          ? "1fr"
          : {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
              xl: "repeat(4, minmax(0, 1fr))",
            },
        gap: compact ? 1.5 : { xs: 2, md: 2.5 },
        alignItems: "start",
      }}
    >
      {filteredVideos.map((item, index) => (
        <Box key={item?.video?.videoId || index} sx={{ minWidth: 0 }}>
          <VideoCard video={item} compact={compact}  channelAvatars={channelAvatars}/>
        </Box>
      ))}
    </Box>
  );
};

export default Videos;
