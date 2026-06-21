import React from "react";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Menu, NotificationsNone, SmartToyOutlined } from "@mui/icons-material";

import SearchBar from "./SearchBar";

const actionLinkSx = (active) => ({
  borderRadius: "999px",
  px: { xs: 1.5, sm: 2 },
  py: 1,
  color: active ? "#0f0f0f" : "#fff",
  backgroundColor: active ? "#fff" : "var(--bg-accent)",
  border: "1px solid",
  borderColor: active ? "#fff" : "var(--border)",
  textTransform: "none",
  fontWeight: 600,
  minWidth: "auto",
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: active ? "#f1f1f1" : "#313131",
  },
});

const Navbar = React.memo(() => {
  const location = useLocation();
  const aiActive = location.pathname.startsWith("/ai");

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(15, 15, 15, 0.96)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={{ xs: 1.25, md: 2 }}
        sx={{
          width: "min(1400px, calc(100vw - 32px))",
          minHeight: 64,
          mx: "auto",
          px: { xs: 0, md: 0 },
          py: { xs: 1.25, md: 1.5 },
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          sx={{ minWidth: { md: 210 }, flexShrink: 0 }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: { xs: "none", sm: "inline-flex" },
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          >
            <Menu fontSize="small" />
          </Box>

          <Link to="/" aria-label="Video Box home">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 36,
                  height: 26,
                  borderRadius: "8px",
                  backgroundColor: "var(--brand)",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-35%, -50%)",
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderLeft: "10px solid white",
                  },
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "0.98rem", sm: "1.05rem" },
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  VIDEO BOX
                </Typography>
              </Box>
            </Stack>
          </Link>
        </Stack>

        <Box
          sx={{
            order: { xs: 3, md: 2 },
            width: { xs: "100%", md: "auto" },
            flex: 1,
            display: "flex",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <SearchBar />
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ order: { xs: 2, md: 3 }, flexShrink: 0 }}
        >
          <Link to="/ai">
            <Button startIcon={<SmartToyOutlined />} sx={actionLinkSx(aiActive)}>
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                Crypto AI
              </Box>
            </Button>
          </Link>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              display: { xs: "none", lg: "inline-flex" },
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            <NotificationsNone fontSize="small" />
          </Box>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "var(--bg-accent)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.84rem",
            }}
          >
            VB
          </Avatar>
        </Stack>
      </Stack>
    </Box>
  );
});

export default Navbar;
