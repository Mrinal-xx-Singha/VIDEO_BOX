import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";
import { fetchFromAPI } from "./utils/fetchFromAPI";
import { ThumbUp, Visibility } from "@mui/icons-material";
const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoData = await fetchFromAPI(
          `videos?part=snippet,statistics&id=${id}`
        );
        setVideoDetail(videoData.items[0]);

        const relatedVideosData = await fetchFromAPI(
          `search?part=snippet&relatedToVideoId=${id}&type=video`
        );
        setVideos(relatedVideosData.items);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoData();
  }, [id]);

  if (!videoDetail?.snippet)
    return (
      <Typography
        color="#fff"
        height="100vh"
        textAlign="center"
        fontSize="2rem"
      >
        Loading...
      </Typography>
    );

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh" p={2}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {/* Video Player Section */}
        <Box flex={1}>
          <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
              controls
            />
          </Box>
          {/* Video Title */}
          <Typography
            color="#fff"
            variant="h5"
            fontWeight="bold"
            p={2}
            sx={{ marginTop: 2 }}
          >
            {title}
          </Typography>

          {/* Video Details (Channel and Stats) */}
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ color: "#fff", paddingX: 2, marginBottom: 2 }}
          >
            <Link to={`/channel/${channelId}`}>
              <Typography
                variant={{ sm: "subtitle1", md: "h6" }}
                color="#fff"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgb(252, 21, 3)",
                  gap: "10px",
                  paddingX: { xs: "12px", md: "24px" },
                  paddingY: { xs: "8px", md: "16px" },
                  borderRadius: { xs: "16px", sm: "18px", md: "20px" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {channelTitle}
                <CheckCircle
                  sx={{
                    fontSize: { xs: "14px", md: "20px" },
                    color: "gray",
                    marginLeft: "5px",
                  }}
                />
              </Typography>
            </Link>

            <Stack
              direction="row"
              gap={{ xs: "10px", md: "20px" }}
              alignItems="center"
            >
              {/* Views Section */}
              <Stack direction="row" alignItems="center" gap="5px">
                <Visibility
                  sx={{
                    fontSize: { xs: "16px", md: "20px" }, // Responsive font size
                    color: "gray",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.7,
                    fontSize: { xs: "10px", md: "16px" }, // Adjust font size for small/large screens
                  }}
                >
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
              </Stack>

              {/* Likes Section */}
              <Stack direction="row" alignItems="center" gap="5px">
                <ThumbUp
                  sx={{
                    fontSize: { xs: "12px", md: "20px" }, // Responsive font size
                    color: "gray",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.7,
                    fontSize: { xs: "10px", md: "16px" }, // Adjust font size for small/large screens
                  }}
                >
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Related Videos Section */}
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
