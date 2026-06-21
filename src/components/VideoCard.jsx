import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoChannelUrl,
  demoChannelTitle,
  demoVideoTitle,
} from "./utils/constants";

const VideoCard = ({ video, compact = false,channelAvatars={} }) => {
  const videoData = video?.video;

  const videoLink = videoData?.videoId ? `/video/${videoData.videoId}` : demoVideoUrl;
  const channelLink = videoData?.channelId ? `/channel/${videoData.channelId}` : demoChannelUrl;
  const thumbnail =
    videoData?.thumbnails?.[1]?.url ||
    videoData?.thumbnails?.[0]?.url ||
    demoThumbnailUrl;

  return (
    <Card
      elevation={0}
      sx={{
        p: 0,
        borderRadius: compact ? 0 : 3,
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
      }}
    >
      <Stack direction={compact ? "row" : "column"} spacing={compact ? 1.25 : 1.3}>
        <Link to={videoLink} style={{ flexShrink: 0 }}>
          <Box
            component="img"
            src={thumbnail}
            alt={videoData?.title || "thumbnail"}
            sx={{
              width: compact ? { xs: 150, sm: 180 } : "100%",
              height: compact ? { xs: 84, sm: 100 } : { xs: 200, sm: 210, lg: 190, xl: 180 },
              objectFit: "cover",
              borderRadius: 3,
              backgroundColor: "#111",
            }}
          />
        </Link>

        <Stack direction="row" spacing={compact ? 1 : 1.25} sx={{ minWidth: 0 }}>
          {!compact && (
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "var(--bg-accent)",
                color: "#fff",
                fontSize: "0.88rem",
                fontWeight: 700,
                mt: 0.25,
                flexShrink: 0,
              }}
              src={channelAvatars[videoData?.channelId] || ""}
            >
              {(videoData?.channelName || demoChannelTitle).slice(0, 1)}
            </Avatar>
          )}

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Link to={videoLink}>
              <Typography
                className={compact ? "line-clamp-3" : "line-clamp-2"}
                sx={{
                  fontSize: compact ? "0.92rem" : "0.98rem",
                  fontWeight: 600,
                  lineHeight: 1.38,
                  color: "var(--text-primary)",
                }}
              >
                {videoData?.title?.slice(0, compact ? 90 : 120) ||
                  demoVideoTitle.slice(0, compact ? 90 : 120)}
              </Typography>
            </Link>

            <Stack spacing={0.25} sx={{ mt: 0.7 }}>
              <Link to={channelLink}>
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <Typography
                    className="line-clamp-2"
                    sx={{ color: "var(--text-secondary)", fontSize: "0.87rem" }}
                  >
                    {videoData?.channelName || demoChannelTitle}
                  </Typography>
                  <CheckCircle sx={{ fontSize: 13, color: "var(--text-secondary)", flexShrink: 0 }} />
                </Stack>
              </Link>

              <Typography sx={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                {[videoData?.viewCountText, videoData?.publishedTimeText]
                  .filter(Boolean)
                  .join(" • ") || "Featured recommendation"}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default VideoCard;
