// utils/fetchGeminiData.js

import axios from "axios";

const GEMINI_API_URL = "https://api.gemini.com/v1/pubticker"; // Gemini API base URL

export const fetchGeminiData = async (cryptoSymbol = "btcusd") => {
  try {
    const response = await axios.get(`${GEMINI_API_URL}/${cryptoSymbol}`);
    return response.data; // This will return data like {last: "50000.00", ...}
  } catch (error) {
    console.error("Error fetching Gemini data:", error);
    throw error;
  }
};
