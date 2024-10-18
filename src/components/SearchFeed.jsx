import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { fetchFromAPI } from "./utils/fetchFromAPI";
import { Videos } from "./";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { searchTerm } = useParams();

  useEffect(() => {
    setLoading(true); // Start loading
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {
        console.log("Fetched data:", data); // Debugging: log the fetched data
        setVideos(data.items || []); // Safeguard in case `data.items` is undefined
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false); // End loading in case of error
      });
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for:{" "}
        <span style={{ color: "#F31503" }}>{searchTerm}</span> videos
      </Typography>

      {loading ? (
        <Typography variant="h6" color="white" textAlign="center">
          Loading...
        </Typography>
      ) : (
        <Videos videos={videos} />
      )}
    </Box>
  );
};

export default SearchFeed;
