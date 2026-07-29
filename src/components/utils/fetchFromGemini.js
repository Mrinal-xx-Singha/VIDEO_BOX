"use server";

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


export const fetchGeminiChartData = async (cryptoSymbol = "btcusd") => {
  try {
    const res = await axios.get(`https://api.gemini.com/v2/candles/${cryptoSymbol}/1day`);
    // gemini returns an array of arrays 
    // we grab the last 30 days, reverse them to ne chronological,and map them for recharts

    const data = res.data.slice(0, 30).reverse();
    return data.map((candle) => ({
      date: new Date(candle[0]).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric'
      }),
      price: candle[4] // Index 4 is the closing price
    }));
  } catch (err) {
    console.error("Error fetching Gemini chart data:", err);
    return []

  }
}