import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import { categories } from "./utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
  <Box
    sx={{
      width: "100%",
      p: { xs: 0, md: 1 },
    }}
  >
    <Typography
      sx={{
        px: 1,
        pb: 1.25,
        display: { xs: "none", md: "block" },
        color: "var(--text-secondary)",
        fontSize: "0.78rem",
        fontWeight: 600,
      }}
    >
      Explore
    </Typography>

    <Stack
      direction={{ xs: "row", md: "column" }}
      spacing={1}
      sx={{
        overflowX: { xs: "auto", md: "visible" },
        overflowY: "visible",
        pb: { xs: 0.5, md: 0 },
      }}
    >
      {categories.map((category) => {
        const active = category.name === selectedCategory;

        return (
          <button
            key={category.name}
            className={`category-btn${active ? " active" : ""}`}
            onClick={() => setSelectedCategory(category.name)}
            type="button"
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.name}</span>
          </button>
        );
      })}
    </Stack>
  </Box>
);

export default Sidebar;
