"use client"

import { Person, Send, SmartToy } from "@mui/icons-material"
import { Box, CircularProgress, IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { answerVideoQuestion } from "./utils/chatWithVideo"



const VideoChat = ({ videoTitle, videoDescription }) => {
    const [messages, setMessages] = useState([
        { sender: "AI", text: "Hello I am your AI Video Co-pilot. Ask me anything about this video's topics or details!" }
    ])

    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Ref used to smoothly scroll down whenever a new message appears
    const messageEndRef = useRef(null)
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])


    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return
        const userMsg = { sender: "User", text: input.trim() }
        const updatedMessage = [...messages, userMsg]
        setMessages(updatedMessage)
        setInput("")
        setIsLoading(true)

        // call our server action
        const aiResponseText = await answerVideoQuestion(videoTitle, videoDescription, updatedMessage, userMsg.text)
        setMessages((prev) => [...prev, { sender: "AI", text: aiResponseText }])
        setIsLoading(false)
    }

    return (
        <Box
            sx={{
                background: "linear-gradient(145deg, #181818 0%, #101010 100%)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                p: { xs: 2, md: 2.5 },
                mt: 3,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
            }}
        >
            {/* Header */}
            <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                pb={2}
                borderBottom="1px solid rgba(255,255,255,0.1)"
            >
                <SmartToy sx={{ color: "#00E5FF", fontSize: 28 }} />
                <Typography
                    variant="h6"
                    color="#fff"
                    fontWeight={700}
                    sx={{
                        letterSpacing: '-0.01em'
                    }}
                >
                    Chat with Video
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ color: "#00E5FF", bgcolor: "rgba(0, 229, 255, 0.1)", px: 1.5, py: 0.5, borderRadius: "12px", border: "1px solid rgba(0, 229, 255, 0.3)" }}
                >
                    Gemini 2.5
                </Typography>

            </Stack>
            {/* Message History Window */}
            <Box
                sx={{ height: 320, overflowY: 'auto', py: 2, display: 'flex', flexDirection: 'column', gap: 1.5, "&::-webkit-scrollbar": { width: "6px" }, "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.2)", borderRadius: "4px" } }}
            >
                {messages.map((msg, idx) => {
                    const isAI = msg.sender === "AI"
                    return (
                        <Stack key={idx}
                            direction="row"
        
                            spacing={1.5}
                            justifyContent={isAI ? "flex-start" : 'flex-end'}
                        >
                            {isAI && <SmartToy sx={{ color: "#00e5ff", mt: 0.5, fontSize: 20 }} />}
                            <Paper
                                sx={{
                                    p: 1.5,
                                    maxWidth: "80%",
                                    bgcolor: isAI ? "rgba(255, 255, 255, 0.05)" : "#3ea6ff",
                                    color: "#fff",
                                    borderRadius: isAI ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                                    border: isAI ? "1px solid rgba(255, 255, 255, 0.08)" : "none"
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ lineHeight: 1.5, whiteSpace: 'pre-wrap' }}
                                >
                                    {msg.text}
                                </Typography>
                            </Paper>
                            {!isAI && <Person sx={{ color: "#fff", mt: 0.5, fontSize: 20 }} />}
                        </Stack>
                    )
                })}
                {isLoading && (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <SmartToy sx={{ color: "#00E5FF", fontSize: 20 }} />
                        <Box
                            sx={{ p: 1.5, bgcolor: "rgba(255, 255, 255, 0.05)", borderRadius: "4px 16px 16px 16px" }}
                        >
                            <CircularProgress size={18} sx={{ color: "#00e5ff" }} />
                        </Box>


                    </Stack>
                )}
                <div ref={messageEndRef} />

            </Box>
            <Box component="form"
                onSubmit={handleSendMessage}
                sx={{ display: 'flex', gap: 1, mt: 1, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
                <TextField
                    fullWidth
                    name="text"
                    variant="outlined"
                    placeholder="Ask a question about this video..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    size="small"
                    sx={{
                        input: { color: "#fff", bgcolor: "rgba(255, 255, 255, 0.05)", borderRadius: "8px" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "rgba(255,255,255,0.2)", borderRadius: "8px" },
                            "&:hover fieldset": { borderColor: "#00E5FF" },
                            "&.Mui-focused fieldset": { borderColor: "#00E5FF" }
                        }
                    }}
                />
                <IconButton
                
                    type="submit" disabled={isLoading || !input.trim()} sx={{ bgcolor: "#00E5FF", color: "#000", borderRadius: "8px", px: 2, "&:hover": { bgcolor: "#00B8D4" }, "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" } }}
                >

                    <Send
                        fontSize="small"
                    />
                </IconButton>
            </Box>
        </Box>

    )
}

export default VideoChat