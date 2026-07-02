import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { generateVideoSummary } from "./utils/generateAiSummary"

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  ThumbUpOutlined,
  VisibilityOutlined,
  SmartToyOutlined,
} from "@mui/icons-material";

import { Videos } from "./";
import { fetchFromAPI } from "./utils/fetchFromAPI";
import { fetchGeminiData } from "./utils/fetchFromGemini";

const formatCount = (value, suffix) => {
  if (!value) return `N/A ${suffix}`;

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return `${value} ${suffix}`;

  return `${numericValue.toLocaleString()} ${suffix}`;
};

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [aiSummary, setAiSummary] = useState(null)
  const [loadingSummary, setLoadingSummary] = useState(false)
  const { id } = useParams();

  const handleGenerateSummary = () => {
    if (!videoDetail) return;
    setLoadingSummary(true);
    generateVideoSummary(
      videoDetail.title,
      videoDetail.shortDescription
    ).then((summary) => {
      setAiSummary(summary);
      setLoadingSummary(false);
    });
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      setError(null);

      try {
        const videoData = await fetchFromAPI(`video?id=${id}`);
        setVideoDetail(videoData.videoDetails);

        // AI summary generation moved to a button click

        const relatedVideosData = await fetchFromAPI(`video/related?id=${id}`);
        setVideos(relatedVideosData.contents?.slice(0, 12) || []);

        const bitcoinData = await fetchGeminiData("btcusd");
        setBitcoinPrice(bitcoinData?.last || null);
      } catch (fetchError) {
        setError("Failed to load video details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  if (loading) {
    return (
      <Box minHeight="70vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress sx={{ color: "var(--brand)" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="#ff8a80" textAlign="center" minHeight="70vh" pt={10}>
        {error}
      </Typography>
    );
  }

  if (!videoDetail) {
    return (
      <Typography color="var(--text-secondary)" textAlign="center" minHeight="70vh" pt={10}>
        Video unavailable.
      </Typography>
    );
  }

  const { title, channelId, author, viewCount, likeCount, shortDescription } = videoDetail;

  return (
    <Stack direction={{ xs: "column", xl: "row" }} spacing={{ xs: 3, xl: 2.5 }} alignItems="flex-start">
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              borderRadius: { xs: 0, sm: 3 },
              overflow: "hidden",
              backgroundColor: "#000",
            }}
          >
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
                controls
              />
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1.3rem", md: "1.6rem" }, fontWeight: 700, lineHeight: 1.32 }}
            >
              {title}
            </Typography>

            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              spacing={2}
              mt={2}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" minWidth={0}>
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: "var(--bg-accent)",
                    color: "#fff",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {(author || "V").slice(0, 1)}
                </Avatar>

                <Box sx={{ minWidth: 0 }}>
                  <Link to={`/channel/${channelId}`}>
                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <Typography
                        className="line-clamp-2"
                        sx={{ fontWeight: 700, fontSize: "0.98rem" }}
                      >
                        {author}
                      </Typography>
                      <CheckCircle sx={{ fontSize: 15, color: "var(--text-secondary)", flexShrink: 0 }} />
                    </Stack>
                  </Link>
                  <Typography sx={{ color: "var(--text-secondary)", mt: 0.35, fontSize: "0.84rem" }}>
                    Channel
                  </Typography>
                </Box>

                <Button
                  sx={{
                    ml: { xs: 0, md: 1 },
                    borderRadius: "999px",
                    px: 2.2,
                    py: 0.9,
                    bgcolor: "#fff",
                    color: "#0f0f0f",
                    textTransform: "none",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    "&:hover": {
                      bgcolor: "#f1f1f1",
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  icon={<VisibilityOutlined sx={{ color: "inherit !important" }} />}
                  label={formatCount(viewCount, "views")}
                  sx={{
                    bgcolor: "var(--bg-accent)",
                    color: "var(--text-primary)",
                    borderRadius: "999px",
                  }}
                />

                <Chip
                  icon={<ThumbUpOutlined sx={{ color: "inherit !important" }} />}
                  label={formatCount(likeCount, "likes")}
                  sx={{
                    bgcolor: "var(--bg-accent)",
                    color: "var(--text-primary)",
                    borderRadius: "999px",
                  }}
                />
              </Stack>
            </Stack>
          </Box>

          {/* AI SUMMARY BOX */}
          <Box
            sx={{
              p: { xs: 1.75, md: 2 },
              borderRadius: 3,
              backgroundColor: "var(--bg-elevated)",
              border: aiSummary || loadingSummary ? "1px solid #3ea6ff" : "none",
              boxShadow: aiSummary || loadingSummary ? "0px 0px 15px rgba(62, 166, 255, 0.15)" : "none",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center">
                <SmartToyOutlined sx={{ color: "#3ea6ff", fontSize: 22 }} />
                <Typography sx={{ fontWeight: 700, color: "#3ea6ff" }}>AI Summary</Typography>
              </Stack>
              
              {!aiSummary && !loadingSummary && (
                <Button 
                  onClick={handleGenerateSummary}
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#3ea6ff",
                    borderColor: "#3ea6ff",
                    borderRadius: "999px",
                    textTransform: "none",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: "rgba(62, 166, 255, 0.1)",
                      borderColor: "#3ea6ff",
                    }
                  }}
                >
                  Generate Summary
                </Button>
              )}
            </Stack>

            {loadingSummary && (
              <Box display="flex" justifyContent="center" alignItems="center" py={3} gap={2}>
                <CircularProgress size={24} sx={{ color: "#3ea6ff" }} />
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  Analyzing video...
                </Typography>
              </Box>
            )}

            {aiSummary && !loadingSummary && (
              <Typography
                sx={{
                  color: "var(--text-primary)",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.65,
                  mt: 2
                }}
              >
                {aiSummary}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              p: { xs: 1.75, md: 2 },
              borderRadius: 3,
              backgroundColor: "var(--bg-elevated)",
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 1.1 }}>Description</Typography>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                whiteSpace: "pre-wrap",
                lineHeight: 1.65,
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: showDescription ? "unset" : 4,
              }}
            >
              {shortDescription || "No description was provided for this video."}
            </Typography>
            {shortDescription && shortDescription.length > 220 && (
              <Button
                onClick={() => setShowDescription((previous) => !previous)}
                sx={{
                  mt: 1.2,
                  px: 0,
                  minWidth: "auto",
                  color: "#3ea6ff",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                {showDescription ? "Show less" : "Show more"}
              </Button>
            )}
          </Box>

          <Box
            sx={{
              p: { xs: 1.75, md: 2 },
              borderRadius: 3,
              backgroundColor: "var(--bg-elevated)",
            }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="space-between">
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <SmartToyOutlined sx={{ color: "var(--text-secondary)", fontSize: 20 }} />
                  <Typography sx={{ fontWeight: 700 }}>Crypto AI snapshot</Typography>
                </Stack>
                <Typography sx={{ color: "var(--text-secondary)", mt: 0.8, lineHeight: 1.6 }}>
                  BTC price while you watch.
                </Typography>
              </Box>

              <Stack alignItems={{ xs: "flex-start", sm: "flex-end" }} spacing={0.75}>
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>
                  BTC / USD
                </Typography>
                <Typography sx={{ fontSize: { xs: "1.35rem", md: "1.6rem" }, fontWeight: 700 }}>
                  {bitcoinPrice ? `$${bitcoinPrice}` : "Unavailable"}
                </Typography>
                <Link to="/ai">
                  <Button
                    sx={{
                      borderRadius: "999px",
                      px: 2,
                      py: 0.8,
                      backgroundColor: "var(--bg-accent)",
                      color: "#fff",
                      textTransform: "none",
                    }}
                  >
                    Open dashboard
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ width: { xs: "100%", xl: 380 }, flexShrink: 0 }}>
        <Box>
          <Typography sx={{ color: "var(--text-secondary)", fontSize: "0.82rem", mb: 0.5 }}>
            Up next
          </Typography>
          <Videos videos={videos} direction="column" />
        </Box>
      </Box>
    </Stack>
  );
};

export default VideoDetail;
