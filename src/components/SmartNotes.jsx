"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Typography, TextField, Button, Stack, Paper, IconButton, CircularProgress, Tooltip, Alert } from "@mui/material";
import { DeleteOutlined, FileDownloadOutlined, BookmarkAddOutlined, AccessTimeOutlined } from "@mui/icons-material";
import { createClient } from "./utils/supabaseClient";

const formatTimestamp = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
};

const SmartNotes = ({ videoId, videoTitle, playerRef }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  const supabase = createClient();

  const fetchNotes = useCallback(async (userId) => {
    if (!userId || !videoId) return;
    const { data, error } = await supabase
      .from("video_notes")
      .select("*")
      .eq("video_id", videoId)
      .eq("user_id", userId)
      .order("timestamp_seconds", { ascending: true });

    if (!error && data) {
      setNotes(data);
    }
    setLoading(false);
  }, [videoId, supabase]);

  useEffect(() => {
    const initAuthAndNotes = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await fetchNotes(user.id);
      } else {
        setLoading(false);
      }
    };
    initAuthAndNotes();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchNotes(session.user.id);
      } else {
        setNotes([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchNotes, supabase.auth]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !user) return;
    setSubmitting(true);

    // Grab current playback time in seconds from our ReactPlayer ref
    const currentTime = playerRef?.current ? Math.floor(playerRef.current.getCurrentTime() || 0) : 0;

    const newEntry = {
      user_id: user.id,
      video_id: videoId,
      timestamp_seconds: currentTime,
      content: newNote.trim(),
    };

    const { data, error } = await supabase
      .from("video_notes")
      .insert([newEntry])
      .select()
      .single();

    if (!error && data) {
      setNotes((prev) => [...prev, data].sort((a, b) => a.timestamp_seconds - b.timestamp_seconds));
      setNewNote("");
    }
    setSubmitting(false);
  };

  const handleDeleteNote = async (id) => {
    // Optimistic UI removal
    setNotes((prev) => prev.filter((note) => note.id !== id));
    await supabase.from("video_notes").delete().eq("id", id);
  };

  const handleSeek = (seconds) => {
    if (playerRef?.current) {
      playerRef.current.seekTo(seconds, "seconds");
    }
  };

  const exportToMarkdown = () => {
    let mdContent = `# Study Notes: ${videoTitle || "Video"}\n\n`;
    notes.forEach((note) => {
      mdContent += `- **[${formatTimestamp(note.timestamp_seconds)}]** ${note.content}\n`;
    });
    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `notes-${videoId}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user) {
    return (
      <Box p={3} mt={2} borderRadius="16px" bgcolor="var(--bg-elevated)" border="1px solid rgba(255,255,255,0.08)" textAlign="center">
        <Typography variant="h6" color="#fff" fontWeight={700}>
          🔒 Unlock Cloud Smart Notes
        </Typography>
        <Typography variant="body2" color="var(--text-secondary)" mt={1}>
          Sign in via the top navigation bar to write timestamped study notes that automatically sync to your private PostgreSQL cloud account!
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, md: 2.5 }} mt={2} borderRadius="16px" bgcolor="var(--bg-elevated)" border="1px solid rgba(255,255,255,0.08)">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" color="#fff" fontWeight={700} display="flex" alignItems="center" gap={1}>
          📝 Cloud Smart Notes & Bookmarks
        </Typography>
        {notes.length > 0 && (
          <Tooltip title="Export Notes as Markdown (.md)">
            <Button
              onClick={exportToMarkdown}
              startIcon={<FileDownloadOutlined />}
              size="small"
              sx={{ color: "#00E5FF", border: "1px solid rgba(0, 229, 255, 0.3)", borderRadius: "8px", textTransform: "none", fontWeight: 700 }}
            >
              Export MD
            </Button>
          </Tooltip>
        )}
      </Stack>

      {/* Note Capture Input Form */}
      <Box component="form" onSubmit={handleAddNote} mb={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type your study insight or code takeaway..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            disabled={submitting}
            sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)", borderRadius: "8px" }, "&:hover fieldset": { borderColor: "#00E5FF" }, "&.Mui-focused fieldset": { borderColor: "#00E5FF" } } }}
          />
          <Button
            type="submit"
            disabled={!newNote.trim() || submitting}
            startIcon={<BookmarkAddOutlined />}
            sx={{
              px: 2.5,
              bgcolor: "#00E5FF",
              color: "#000",
              fontWeight: 700,
              borderRadius: "8px",
              textTransform: "none",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#00B8D4" },
              "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }
            }}
          >
            {submitting ? <CircularProgress size={20} sx={{ color: "#000" }} /> : "Save Note ⏱"}
          </Button>
        </Stack>
      </Box>

      {/* Notes List Display */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={3}>
          <CircularProgress size={28} sx={{ color: "#00E5FF" }} />
        </Box>
      ) : notes.length === 0 ? (
        <Alert severity="info" sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "var(--text-secondary)", border: "1px dashed rgba(255,255,255,0.15)", borderRadius: "10px" }}>
          No notes captured for this video yet! Play the video and click <b>Save Note</b> to capture your first timestamped bookmark.
        </Alert>
      ) : (
        <Stack spacing={1.5} sx={{ maxHeight: 380, overflowY: "auto", pr: 0.5 }}>
          {notes.map((note) => (
            <Paper
              key={note.id}
              elevation={0}
              sx={{
                p: 1.5,
                bgcolor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                transition: "border-color 0.2s, background-color 0.2s",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(0, 229, 255, 0.3)" }
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0, flex: 1 }}>
                <Tooltip title="Click to jump video to this exact second!">
                  <Box
                    onClick={() => handleSeek(note.timestamp_seconds)}
                    sx={{
                      px: 1.2,
                      py: 0.5,
                      borderRadius: "6px",
                      bgcolor: "rgba(0, 229, 255, 0.12)",
                      color: "#00E5FF",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      flexShrink: 0,
                      transition: "all 0.2s",
                      "&:hover": { bgcolor: "#00E5FF", color: "#000", transform: "scale(1.05)" }
                    }}
                  >
                    <AccessTimeOutlined sx={{ fontSize: 15 }} />
                    {formatTimestamp(note.timestamp_seconds)}
                  </Box>
                </Tooltip>
                <Typography variant="body2" color="#fff" sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", flex: 1 }}>
                  {note.content}
                </Typography>
              </Stack>
              <Tooltip title="Delete note">
                <IconButton onClick={() => handleDeleteNote(note.id)} size="small" sx={{ color: "var(--text-secondary)", "&:hover": { color: "#ff8a80" } }}>
                  <DeleteOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default SmartNotes;