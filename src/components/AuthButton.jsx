"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Avatar, Menu, MenuItem, ListItemIcon, Typography, Skeleton } from "@mui/material";
import { AccountCircleOutlined, LogoutOutlined } from "@mui/icons-material";
import { createClient } from "./utils/supabaseClient";
import AuthModal from "./AutModel"

const AuthButton = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const supabase = createClient();

  useEffect(() => {
    // 1. Fetch current logged in user on initial mount
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    fetchUser();

    // 2. Subscribe to real-time session changes (like when logging in via Modal)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    setAnchorEl(null);
    await supabase.auth.signOut();
  };

  if (loading) {
    return <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: "var(--bg-accent)" }} />;
  }

  // If user is not logged in, display the Sign In chip
  if (!user) {
    return (
      <>
        <Button
          onClick={() => setModalOpen(true)}
          startIcon={<AccountCircleOutlined sx={{ color: "#00E5FF" }} />}
          sx={{
            borderRadius: "999px",
            px: 2,
            py: 0.8,
            color: "#fff",
            backgroundColor: "var(--bg-accent)",
            border: "1px solid rgba(0, 229, 255, 0.4)",
            textTransform: "none",
            fontWeight: 700,
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "rgba(0, 229, 255, 0.15)",
              borderColor: "#00E5FF",
            },
          }}
        >
          Sign In
        </Button>
        <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  // If logged in, display the personalized user initial Avatar
  const userInitial = user.email ? user.email[0].toUpperCase() : "U";

  return (
    <>
      <Avatar
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          width: 38,
          height: 38,
          bgcolor: "#00E5FF",
          color: "#000",
          fontWeight: 700,
          fontSize: "0.95rem",
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(0, 229, 255, 0.4)",
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.06)" }
        }}
      >
        {userInitial}
      </Avatar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: 1.5,
            bgcolor: "#181818",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            minWidth: 180
          }
        }}
      >
        <Box px={2} py={1} borderBottom="1px solid rgba(255,255,255,0.1)">
          <Typography variant="caption" color="var(--text-secondary)">Signed in as</Typography>
          <Typography variant="body2" fontWeight={700} noWrap sx={{ maxWidth: 160 }}>{user.email}</Typography>
        </Box>
        <MenuItem onClick={handleSignOut} sx={{ mt: 0.5, py: 1, "&:hover": { bgcolor: "rgba(255,255,255,0.08)" } }}>
          <ListItemIcon><LogoutOutlined fontSize="small" sx={{ color: "#ff8a80" }} /></ListItemIcon>
          <Typography variant="body2" color="#ff8a80" fontWeight={600}>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AuthButton;