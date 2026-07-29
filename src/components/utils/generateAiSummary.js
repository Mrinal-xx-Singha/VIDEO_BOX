"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateVideoSummary = async (videoTitle, videoDescription) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY || "";
        const genAI = new GoogleGenerativeAI(apiKey);
        // select the specific ai model we want to use
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
        Act as an expert YouTube summarizer. 
      Read the following video title and description and provide a 3-bullet point summary of what the video is likely about.
      Keep it concise and engaging.
      Title: ${videoTitle}
      Description: ${videoDescription}
        `

        // send the prompt to the ai model and wait for responser
        const result = await model.generateContent(prompt)
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Failed to generate AI summary:", error);
        return "Failed to generate AI summary. Please try again later.";

    }
}