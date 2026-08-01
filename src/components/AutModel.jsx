"use client"

import { Box, Dialog, DialogContent, Stack, Tabs, Tab, Alert, TextField, Button,Typography,CircularProgress } from "@mui/material"
import { useState, useSyncExternalStore } from "react"
import { createClient } from "./utils/supabaseClient"
import { LockOutlined,PersonAddAltOutlined } from "@mui/icons-material"

const AuthModel = ({open,onClose}) => {
    const [tabIndex, setTabIndex] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const supabase = createClient()

    const handleAuth = async (e) => {
        e.preventDefault()
        setErrorMsg("")
        setSuccessMsg("")
        if (!email.trim() || !password.trim()) {
            setErrorMsg("Please provide both email and password")
            return
        }
        setLoading(true)
        try {
            if (tabIndex === 0) {
                // Sign in
                const { error } = await supabase.auth.signInWithPassword({ email, password })
                if (error) throw error
                onClose()
            } else {

                // Sign up
                const { error, data } = await supabase.auth.signUp({ email, password })
                if (error) throw error
                setSuccessMsg("Registration successful! You are now logged in,")
                setTimeout(() => onClose(), 1500)
            }

        } catch (error) {
            setErrorMsg(error.message || "An authorization error occured")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    background: "linear-gradient(145deg, #1e1e1e 0%, #121212 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "16px",
                    width: "100%",
                    maxWidth: 420,
                    p: 1,
                    boxShadow: "0 16px 40px 0 rgba(0, 0, 0, 0.6)",
                }
            }}
        >
            <DialogContent>
                <Stack spacing={2.5} pt={1}>
                    <Box textAlign="center">

                        <Typography variant="h5" color="#fff" fontWeight={700} letterSpacing="-0.02em">
                            Welcome to VIDEO BOX
                        </Typography>
                        <Typography variant="body2" color="var(--text-secondary)" mt={0.5}>
                            Sign in to unlock AI Smart Notes & Playlists
                        </Typography>
                    </Box>

                    <Tabs
                        value={tabIndex}
                        onChange={(_, newVal) => {
                            setTabIndex(newVal);
                            setErrorMsg("");
                            setSuccessMsg("")
                        }}
                        variant="fullWidth"
                        sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)", "& .MuiTab-root": { color: "var(--text-secondary)", fontWeight: 600, textTransform: "none" }, "& .Mui-selected": { color: "#00E5FF !important" }, "& .MuiTabs-indicator": { bgcolor: "#00E5FF" } }}
                    >
                        <Tab icon={<LockOutlined fontSize="small" />} iconPosition="start" label="Sign In" />
                        <Tab icon={<PersonAddAltOutlined fontSize="small" />} iconPosition="start" label="Create Account" />

                    </Tabs>
                    {errorMsg && <Alert severity="error" sx={{ borderRadius: "8px", bgcolor: "rgba(244, 67, 54, 0.1)", color: "#ff8a80", border: "1px solid rgba(244, 67, 54, 0.3)" }}>{errorMsg}</Alert>}
                    {successMsg && <Alert severity="success" sx={{ borderRadius: "8px", bgcolor: "rgba(76, 175, 80, 0.1)", color: "#a5d6a7", border: "1px solid rgba(76, 175, 80, 0.3)" }}>{successMsg}</Alert>}

                    <Box component="form" onSubmit={handleAuth} display="flex" flexDirection="column" gap={2}>

                        <TextField

                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            fullWidth
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ style: { color: "var(--text-secondary)" } }}
                            sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)", borderRadius: "8px" }, "&:hover fieldset": { borderColor: "#00E5FF" }, "&.Mui-focused fieldset": { borderColor: "#00E5FF" } } }}
                        />
                        <TextField
                            label="Password (min 6 chars)"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            fullWidth
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ style: { color: "var(--text-secondary)" } }}
                            sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)", borderRadius: "8px" }, "&:hover fieldset": { borderColor: "#00E5FF" }, "&.Mui-focused fieldset": { borderColor: "#00E5FF" } } }}
                        />
                        <Button
                            type="submit"
                            disabled={loading || !email || !password}
                            fullWidth
                            sx={{
                                py: 1.2,
                                mt: 1,
                                bgcolor: "#00E5FF",
                                color: "#000",
                                fontWeight: 700,
                                borderRadius: "8px",
                                textTransform: "none",
                                fontSize: "0.95rem",
                                "&:hover": { bgcolor: "#00B8D4" },
                                "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }
                            }}
                        >
                            {loading ? <CircularProgress size={22} sx={{ color: "#000" }} /> : tabIndex === 0 ? "Sign In" : "Register Now"}

                        </Button>
                    </Box>
                </Stack>
            </DialogContent>

        </Dialog>
    )

}

export default AuthModel