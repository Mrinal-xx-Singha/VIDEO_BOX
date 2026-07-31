"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export const answerVideoQuestion = async (videoTitle, videoDescription, chatHistory, newUserQuestion) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY || ""
        const genAI = new GoogleGenerativeAI(apiKey)

        // We choose gemini-2.5-flash because it provides low-latency responses suitable for live chat UI
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

        // we build a system prompt that anchors the AI directly to the streaming video's facts
        const systemPrompt = `
        You are a insightful AI co-pilot assisting a viewer who is currently watching a video.
        Here is the information about the video currently playing:
        Title: "${videoTitle}"
        Description: "${videoDescription}"

        Your goal is to accurately and conversationally answer the user's question about this video.
        Keep answers engaging, helpful, and concise (under 150 words).
        If asked something totally urnelated to the video or common knowledge, politely remind them you are here to assist with the specific video!
        
        `
        // Combine previous chat history context with the latest question
        const prompt = `
        ${systemPrompt}
        Previous conversation context:
        ${chatHistory.map((m) => `${m.sender}: ${m.text}`).join('\n')}

        User's latest question: "${newUserQuestion}"
        AI Response:
        `

        const result = await model.generateContent(prompt)
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating video chat answer:", error);
        return "I apologize, but I encountered an error connecting to my AI processor. Please check your API limits or try again!";

    }

}