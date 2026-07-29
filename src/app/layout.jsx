import "../index.css";
import { Box } from "@mui/material";
import { Navbar } from "../components";
import Providers from "./providers";

export const metadata = {
  title: "VIDEO BOX - AI & Crypto Intelligence Hub",
  description: "A high-performance video aggregator powered by Gemini AI summaries and real-time Crypto charts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box className="app-shell">
            <Navbar />
            <Box className="app-main">
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
