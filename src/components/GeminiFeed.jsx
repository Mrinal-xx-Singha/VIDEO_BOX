import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Videos from "./Videos"; // Your Videos component
import { fetchFromAPI } from "./utils/fetchFromAPI"; // Your YouTube API fetch function
import { fetchGeminiData } from "./utils/fetchFromGemini"; // Gemini API fetch function

const CRYPTO_OPTIONS = [
  { symbol: "btcusd", name: "Bitcoin (BTC)" },
  { symbol: "ethusd", name: "Ethereum (ETH)" },
  { symbol: "ltcusd", name: "Litecoin (LTC)" },
  { symbol: "solusd", name: "Solana (SOL)" },
];

const GeminiFeed = () => {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState("btcusd"); // Default to Bitcoin
  const [videos, setVideos] = useState([]); // To store YouTube videos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCryptoDataAndVideos = async (cryptoSymbol) => {
    try {
      setLoading(true);
      // Fetch Gemini price data for the selected crypto
      const cryptoData = await fetchGeminiData(cryptoSymbol);
      setCryptoPrices(cryptoData);

      // Fetch YouTube videos related to the selected cryptocurrency
      const videoData = await fetchFromAPI(
        `search?part=snippet&q=${cryptoSymbol.replace(
          "usd",
          ""
        )}%20news&maxResults=5`
      );
      setVideos(videoData.items);
      setLoading(false);
    } catch (err) {
      setError("Failed to load data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoDataAndVideos(selectedCrypto);
    const intervalId = setInterval(() => {
      fetchCryptoDataAndVideos(selectedCrypto);
    }, 60000); // Refresh data every 60 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [selectedCrypto]);

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: "white" }}
      >
        Cryptocurrency Dashboard
      </Typography>

      {/* Dropdown to select cryptocurrency */}
      <Box mb={3} display="flex" justifyContent="center">
        <Select
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value)}
          displayEmpty
          sx={{
            minWidth: 200,
            color: "white",
            backgroundColor: "#2e2e2e",
            borderRadius: "10px",
            padding: "8px 10px",
            border: "1px solid #e0e0e0",
            "& .MuiSelect-icon": {
              color: "white", // Ensures the dropdown arrow is white
            },
            "&:hover": {
              borderColor: "#FC1503", // Add hover effect to border
            },
            "&:focus": {
              borderColor: "#FC1503", // Add focus effect to border
            },
          }}
          IconComponent={(props) => (
            <svg
              {...props}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ width: 20, height: 20 }} // Custom arrow icon
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        >
          {CRYPTO_OPTIONS.map((crypto) => (
            <MenuItem key={crypto.symbol} value={crypto.symbol}>
              {crypto.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Display crypto prices */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="red" align="center">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 2, backgroundColor: "#1e272e" }}
            >
              <Typography variant="h6" color="white" align="center">
                {CRYPTO_OPTIONS.find((c) => c.symbol === selectedCrypto)?.name}
              </Typography>
              <Typography variant="body1" color="white" align="center">
                Current Price: ${cryptoPrices.last}
              </Typography>
              <Typography variant="body2" color="white" align="center">
                Bid: ${cryptoPrices.bid} | Ask: ${cryptoPrices.ask}
              </Typography>
              <Typography variant="body2" color="white" align="center">
                24h Change: {cryptoPrices.percentChange}%
              </Typography>
              <Typography variant="body2" color="white" align="center">
                24h Volume:{" "}
                {cryptoPrices.volume &&
                  cryptoPrices.volume[selectedCrypto.replace("usd", "")]}{" "}
                {selectedCrypto.replace("usd", "").toUpperCase()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Crypto-related YouTube Videos */}
      <Box mt={4}>
        <Typography variant="h5" color="white" mb={2} align="center">
          {CRYPTO_OPTIONS.find((c) => c.symbol === selectedCrypto)?.name} News
          Videos
        </Typography>
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2}>
          <Videos videos={videos} direction="row" />
        </Stack>
      </Box>
    </Box>
  );
};

export default GeminiFeed;
