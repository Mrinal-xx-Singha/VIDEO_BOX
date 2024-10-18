import React from "react";
import { Button, Stack, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = React.memo(() => (
  <nav aria-label="Main navigation">
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        gap:{xs:"2px"},
        backgroundColor: "#000",
        justifyContent: "space-between",
        zIndex: 10,
        px: { xs: 1, sm: 2, md: 4 }, // Responsive padding based on screen size
        height: { xs: "56px", sm: "64px", md: "72px" }, // Height adapts for small to large screens
        transition: "height 0.3s ease",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Adding a shadow for a more elevated effect
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{ display: "flex", alignItems: "center" }}
        aria-label="Home"
      >
        <Typography
          variant="h5"
          sx={{
            color: "lightgray",
            fontFamily: "Roboto",
            fontWeight: "bold",
            letterSpacing: 1.2,
            fontSize: { xs: "12px", sm: "20px", md: "22px" }, // Adjusting font size for responsiveness
            display: "flex",
            alignItems: "center",
          }}
        >
          VIDEO BOX
        </Typography>
      </Link>

      {/* Gemini Link */}
      <Link
        to="/ai"
        style={{ display: "flex", alignItems: "center" }}
        aria-label="AI"
      >
        <Button
          sx={{
            color: "white",
            backgroundColor: "#FC1503",
            fontSize: { xs: "10px", sm: "14px", md: "16px" }, // Adjusting font size for responsiveness
            padding: { xs: "6px 12px", sm: "8px 16px" }, // Adjusting padding for button based on screen size
            textTransform: "none", // Keeping the text normal case for readability
            borderRadius: "8px", // Smoother button edges
            "&:hover": {
              backgroundColor: "#d01002", // Darker shade on hover for a better effect
            },
          }}
          size="medium"
        >
          Crypto AI
        </Button>
      </Link>

      {/* Search Bar */}
      <Box sx={{ width: { xs: "50%", sm: "60%", md: "70%" } }}>
        {" "}
        {/* Width adjusts based on screen size */}
        <SearchBar />
      </Box>
    </Stack>
  </nav>
));

export default Navbar;
