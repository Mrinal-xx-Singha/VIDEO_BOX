import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Paper } from "@mui/material";
import { Search, KeyboardVoiceOutlined } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm) {
      navigate(`/search/${trimmedTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        width: "min(640px, 100%)",
        height: 44,
        borderRadius: "999px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#121212",
        border: "1px solid #303030",
        overflow: "hidden",
      }}
    >
      <Box
        component="input"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search"
        aria-label="Search videos"
        sx={{
          flex: 1,
          height: "100%",
          border: "none",
          outline: "none",
          background: "transparent",
          color: "var(--text-primary)",
          px: 2,
          fontSize: "0.95rem",
          minWidth: 0,
          "&::placeholder": {
            color: "var(--text-secondary)",
            opacity: 1,
          },
        }}
      />

      <IconButton
        aria-label="voice search"
        sx={{
          color: "var(--text-secondary)",
          display: { xs: "none", sm: "inline-flex" },
          mr: 0.5,
        }}
      >
        <KeyboardVoiceOutlined fontSize="small" />
      </IconButton>

      <IconButton
        type="submit"
        aria-label="submit search"
        sx={{
          width: 58,
          height: "100%",
          borderRadius: 0,
          borderLeft: "1px solid #303030",
          color: "var(--text-primary)",
          backgroundColor: "#222222",
          "&:hover": {
            backgroundColor: "#2d2d2d",
          },
        }}
      >
        <Search fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
