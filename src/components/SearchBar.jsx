import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      navigate(`/search/${trimmedTerm}`);
      setSearchTerm(""); // Clear the search input after submitting
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: "20px",
        border: "1px solid #e3e3e3",
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: "400px", md: "500px" }, // Responsive width scaling from mobile to desktop
        height: { xs: "38px", sm: "50px" }, // Adjust height for different screen sizes
        boxShadow: "none",
        pl: 2,
        pr: 2,
        backgroundColor: "#fff", // Set background color for better visibility
      }}
    >
      <TextField
        variant="standard"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: { xs: "12px", sm: "14px" }, // Responsive font size
          },
        }}
        fullWidth
        aria-label="search field"
        inputProps={{
          style: {
            padding: "0 5px", // Added padding inside the text input for better spacing
          },
        }}
      />
      <IconButton
        type="submit"
        sx={{
          p: { xs: "5px", sm: "10px" }, // Increased padding for larger touch target
          color: "red",
        }}
        aria-label="search"
      >
        <Search sx={{ fontSize: { xs: "20px", sm: "24px" } }} /> {/* Responsive icon size */}
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
