import React, {  useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  AutoGraphOutlined,
  CurrencyBitcoin,
  NewspaperOutlined,
  SyncOutlined,
} from "@mui/icons-material";

import Videos from "./Videos";
import { fetchFromAPI } from "./utils/fetchFromAPI";
import { fetchGeminiData } from "./utils/fetchFromGemini";
import { useQuery } from "@tanstack/react-query";

const CRYPTO_OPTIONS = [
  { symbol: "btcusd", name: "Bitcoin (BTC)" },
  { symbol: "ethusd", name: "Ethereum (ETH)" },
  { symbol: "ltcusd", name: "Litecoin (LTC)" },
  { symbol: "solusd", name: "Solana (SOL)" },
];

const statCards = (selectedCrypto, cryptoPrices) => [
  {
    label: "Current price",
    value: cryptoPrices?.last ? `$${cryptoPrices.last}` : "Unavailable",
    icon: <CurrencyBitcoin fontSize="small" />,
  },
  {
    label: "Bid / Ask",
    value:
      cryptoPrices?.bid && cryptoPrices?.ask
        ? `$${cryptoPrices.bid} / $${cryptoPrices.ask}`
        : "Unavailable",
    icon: <AutoGraphOutlined fontSize="small" />,
  },
  {
    label: "Last Updated",
    value: cryptoPrices?.volume?.timestamp 
      ? new Date(cryptoPrices.volume.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      : "Unavailable",
    icon: <SyncOutlined fontSize="small" />,
  },
  {
    label: "Volume",
    value:
      cryptoPrices?.volume?.[selectedCrypto.replace("usd", "").toUpperCase()]
        ? `${cryptoPrices.volume[selectedCrypto.replace("usd", "").toUpperCase()]} ${selectedCrypto
          .replace("usd", "")
          .toUpperCase()}`
        : "Unavailable",
    icon: <NewspaperOutlined fontSize="small" />,
  },
];

const GeminiFeed = () => {

  const [selectedCrypto, setSelectedCrypto] = useState("btcusd");

  const { data, isLoading, isError: error } = useQuery({
    queryKey: ['geminiFeed', selectedCrypto],
    queryFn: async () => {
      // fetch both the price 
      // and the videos at the same time 
      const [cryptoData, videoData] = await Promise.all([
        fetchGeminiData(selectedCrypto)
        , fetchFromAPI(`search?query=${selectedCrypto.replace('usd', "")}%20news&maxResults=6`)
      ])

      return {
        cryptoPrices: cryptoData || {},
        videos: videoData.contents?.slice(0, 6) || []
      }

    }
  })

  const cryptoPrices = data?.cryptoPrices || {}
  const videos = data?.videos || []
console.log(cryptoPrices)
  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <Box>
          <Typography sx={{ color: "var(--text-secondary)", fontSize: "0.82rem", mb: 0.5 }}>
            Market overview
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: "1.5rem", md: "1.9rem" }, fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Crypto AI
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", sm: 240 },
            backgroundColor: "var(--bg-elevated)",
            borderRadius: 3,
          }}
        >
          <Select
            fullWidth
            value={selectedCrypto}
            onChange={(event) => setSelectedCrypto(event.target.value)}
            sx={{
              color: "var(--text-primary)",
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiSvgIcon-root": { color: "var(--text-primary)" },
            }}
          >
            {CRYPTO_OPTIONS.map((crypto) => (
              <MenuItem key={crypto.symbol} value={crypto.symbol}>
                {crypto.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Stack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress sx={{ color: "var(--brand)" }} />
        </Box>
      ) : error ? (
        <Typography sx={{ color: "#ff8a80", py: 6, textAlign: "center" }}>
          Failed to load market data.
        </Typography>
      ) : (
        // stat cards grid
        <Grid container spacing={2}>
          {statCards(selectedCrypto, cryptoPrices).map((card) => (
            <Grid item xs={12} sm={6} lg={3} key={card.label}>
              <Box
                sx={{
                  height: "100%",
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "var(--text-secondary)" }}>
                  {card.icon}
                  <Typography sx={{ fontSize: "0.82rem" }}>{card.label}</Typography>
                </Stack>
                <Typography sx={{ mt: 1.2, fontWeight: 700, fontSize: "1.18rem", lineHeight: 1.35 }}>
                  {card.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box>
        <Typography sx={{ color: "var(--text-secondary)", fontSize: "0.82rem", mb: 0.5 }}>
          Related news videos
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: "1.45rem", md: "1.8rem" }, fontWeight: 700, letterSpacing: "-0.02em", mb: 2 }}
        >
          {CRYPTO_OPTIONS.find((crypto) => crypto.symbol === selectedCrypto)?.name}
        </Typography>
        <Videos videos={videos} isLoading={isLoading}/>
      </Box>
    </Stack>
  );
};

export default GeminiFeed;
