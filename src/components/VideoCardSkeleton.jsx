import React from "react";
import { Box, Card, Skeleton, Stack } from "@mui/material";

const VideoCardSkeleton = ({ compact = false }) => (
  <Card
    elevation={0}
    sx={{ p: 0, borderRadius: compact ? 0 : 3, backgroundColor: "transparent" }}
  >
    <Stack direction={compact ? "row" : "column"} spacing={compact ? 1.25 : 1.3}>
      <Skeleton 
        variant="rectangular" 
        sx={{
          width: compact ? { xs: 150, sm: 180 } : "100%",
          height: compact ? { xs: 84, sm: 100 } : { xs: 200, sm: 210, lg: 190, xl: 180 },
          borderRadius: 3,
          backgroundColor: "var(--bg-accent)"
        }} 
      />
      
      <Stack direction="row" spacing={compact ? 1 : 1.25} sx={{ minWidth: 0, width: "100%" }}>
        {!compact && (
           <Skeleton variant="circular" width={36} height={36} sx={{ backgroundColor: "var(--bg-accent)" }} />
        )}
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="90%" sx={{ fontSize: '1rem', backgroundColor: "var(--bg-accent)" }} />
          <Skeleton variant="text" width="60%" sx={{ fontSize: '1rem', backgroundColor: "var(--bg-accent)" }} />
          <Skeleton variant="text" width="40%" sx={{ fontSize: '0.8rem', mt: 1, backgroundColor: "var(--bg-accent)" }} />
        </Box>
      </Stack>
    </Stack>
  </Card>
);

export default VideoCardSkeleton;