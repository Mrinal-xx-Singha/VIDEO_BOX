import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";

import { fetchFromAPI } from "./utils/fetchFromAPI";
import { Sidebar, Videos } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true); // Start loading
      setVideos(null); // Reset videos
      setError(null); // Reset error
      try {
        const data = await fetchFromAPI(
          `search?part=snippet&q=${selectedCategory}`
        );
        setVideos(data.items);
      } catch (err) {
        setError("Failed to fetch videos."); // Handle API errors
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchVideos();
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "100vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023 @Mrinal Singha
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>videos</span>
        </Typography>

        {loading ? ( // Loading spinner
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : error ? ( // Error message
          <Typography variant="body2" sx={{ color: "red" }}>
            {error}
          </Typography>
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
