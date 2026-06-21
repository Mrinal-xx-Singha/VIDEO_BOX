import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "./utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      try {
        const channelData = await fetchFromAPI(`channel?id=${id}`);
        setChannelDetail(channelData);
        setVideos(channelData.contents?.filter((item) => item.video) || []);
      } catch (error) {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  if (loading) {
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
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default ChannelDetail;
