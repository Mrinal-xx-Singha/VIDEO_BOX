import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
  GeminiFeed,
} from "./components";

const App = () => (
  <BrowserRouter>
    <Box className="app-shell">
      <Navbar />
      <Box className="app-main">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/ai" element={<GeminiFeed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
);

export default App;
