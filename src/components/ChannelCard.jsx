import React from "react";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ChannelCard = ({ channelDetail, marginTop }) => (
  <Box
    sx={{
      width: "100%",
      mx: "auto",
      mt: marginTop || 0,
    }}
  >
    <Link to={`/channel/${channelDetail?.channelId || ""}`}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2.5}
        alignItems={{ xs: "center", sm: "flex-start" }}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border)",
        }}
      >
        <Avatar
          src={channelDetail?.avatar?.thumbnails?.[0]?.url}
          alt={channelDetail?.title}
          sx={{
            width: { xs: 96, md: 120 },
            height: { xs: 96, md: 120 },
            flexShrink: 0,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0, textAlign: { xs: "center", sm: "left" } }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent={{ xs: "center", sm: "flex-start" }}
            flexWrap="wrap"
          >
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1.45rem", md: "1.8rem" }, fontWeight: 700 }}
            >
              {channelDetail?.title}
            </Typography>
            {channelDetail?.verified && <CheckCircle sx={{ fontSize: 18, color: "#aaaaaa" }} />}
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            mt={1.25}
            justifyContent={{ xs: "center", sm: "flex-start" }}
            flexWrap="wrap"
          >
            <Chip
              label={channelDetail?.subscriberCountText || "Subscribers unavailable"}
              sx={{ bgcolor: "var(--bg-accent)", color: "var(--text-primary)" }}
            />
            <Chip
              label={channelDetail?.videosCountText || "Videos available"}
              sx={{ bgcolor: "var(--bg-accent)", color: "var(--text-primary)" }}
            />
          </Stack>

          <Typography
            sx={{
              color: "var(--text-secondary)",
              mt: 1.5,
              lineHeight: 1.65,
              maxWidth: 760,
            }}
          >
            {channelDetail?.description?.slice(0, 220) || "Latest uploads and creator videos."}
          </Typography>
        </Box>
      </Stack>
    </Link>
  </Box>
);

export default ChannelCard;
