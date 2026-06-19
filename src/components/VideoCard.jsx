import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoChannelUrl,
  demoChannelTitle,
  demoVideoTitle,
} from "./utils/constants";

const VideoCard = ({ video }) => {
  const videoData = video?.video;

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link
        to={
          videoData?.videoId
            ? `/video/${videoData.videoId}`
            : demoVideoUrl
        }
      >
        <CardMedia
          component="img"
          image={
            videoData?.thumbnails?.[1]?.url ||
            videoData?.thumbnails?.[0]?.url ||
            demoThumbnailUrl
          }
          alt={videoData?.title || "thumbnail"}
          sx={{
            width: "100%",
            height: 180,
          }}
        />
      </Link>

      <CardContent
        sx={{
          backgroundColor: "#1E1E1E",
          height: "106px",
        }}
      >
        <Link
          to={
            videoData?.videoId
              ? `/video/${videoData.videoId}`
              : demoVideoUrl
          }
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#FFF"
          >
            {videoData?.title?.slice(0, 60) ||
              demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>

        <Link
          to={
            videoData?.channelId
              ? `/channel/${videoData.channelId}`
              : demoChannelUrl
          }
        >
          <Typography
            variant="subtitle2"
            color="gray"
            display="flex"
            alignItems="center"
          >
            {videoData?.channelName || demoChannelTitle}
            <CheckCircle
              sx={{
                fontSize: 12,
                color: "gray",
                ml: "5px",
              }}
            />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;