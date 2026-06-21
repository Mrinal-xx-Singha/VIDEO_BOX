import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "./utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchFromAPI(`search?query=${searchTerm}`);
        setVideos(data.contents || []);
      } catch (err) {
        setError("Unable to load search results right now.");
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [searchTerm]);

  return (
    <Box>
      <Box sx={{ px: { xs: 0.5, md: 1 }, pb: 2 }}>
        <Typography sx={{ color: "var(--text-secondary)", fontSize: "0.82rem", mb: 0.5 }}>
          Search results
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: "1.45rem", md: "1.9rem" }, fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          {searchTerm}
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="45vh">
          <CircularProgress sx={{ color: "var(--brand)" }} />
        </Box>
      ) : error ? (
        <Typography sx={{ color: "#ff8a80", py: 6, textAlign: "center" }}>
          {error}
        </Typography>
      ) : (
        <Videos videos={videos} />
      )}
    </Box>
  );
};

export default SearchFeed;
