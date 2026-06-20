import React from "react";
import {
  Box,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ChannelCard = ({ channelDetail, marginTop }) => {
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "100%", sm: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
        marginTop,
      }}
    >
      <Link to={`/channel/${channelDetail?.channelId || ""}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            component="img"
            image={
              channelDetail?.avatar?.thumbnails?.[0]?.url
            }
            alt={channelDetail?.title}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
            }}
          />

          <Typography variant="h6">
            {channelDetail?.title}
            {channelDetail?.verified && (
              <CheckCircle
                sx={{
                  fontSize: 14,
                  color: "gray",
                  ml: "5px",
                }}
              />
            )}
          </Typography>

          <Typography variant="body2" color="gray">
            {channelDetail?.subscriberCountText}
          </Typography>

          <Typography variant="body2" color="gray">
            {channelDetail?.videosCountText} videos
          </Typography>
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;