<div align="center">
  <h1>🎬 VIDEO BOX</h1>
  <p>A high-performance, modern YouTube clone integrated with real-time Crypto data, AI summaries, and interactive data visualization.</p>

  <a href="https://video-box-alpha.vercel.app/"><strong>View Live Demo</strong></a> · 
  <a href="https://next-folio-bay.vercel.app/"><strong>My Portfolio</strong></a> · 
  <a href="https://www.linkedin.com/in/mrinal-singha-754b57249/"><strong>LinkedIn</strong></a>
</div>

<br />

## 🚀 Overview

Video Box is a comprehensive media application that replicates the core functionality of YouTube while introducing a dedicated **Crypto AI Dashboard**. It fetches real-time video data via the YouTube Data API (RapidAPI) and real-time cryptocurrency metrics via the Gemini API. 

Built with scalability and user experience in mind, this project demonstrates advanced React patterns, aggressive performance optimization through data caching, and seamless third-party library integrations.

## ✨ Core Features

- **Advanced Data Caching**: Fully powered by `@tanstack/react-query` to cache API responses, eliminate redundant network requests, and manage complex loading/error states declaratively.
- **Crypto AI Dashboard**: A dedicated route (`/ai`) that fetches live market data (Bitcoin, Ethereum, Solana) and polls the Gemini API in the background without blocking the UI.
- **Interactive Data Visualization**: Features a 30-day historical price chart built with `recharts`, complete with custom tooltips and responsive scaling.
- **Generative AI Summaries**: Integrated with `@google/generative-ai` to dynamically generate comprehensive, context-aware summaries of videos on demand.
- **Premium UI/UX**: Built with Material UI (MUI). Features sticky sidebars, custom scrollbars, animated skeleton loaders to eliminate layout shift, and a sleek dark mode aesthetic.
- **Category & Search Filtering**: Rapidly filter videos by 15+ categories or use the global search bar to fetch highly specific content.

## 🧠 Complexities Solved

This project presented several unique engineering challenges that were successfully resolved:

1. **State Management & Race Conditions**: Migrated away from fragile `useState` and `useEffect` API polling. Replaced with React Query, leveraging `Promise.all` for parallel data fetching and `refetchInterval` for safe, background polling that automatically cleans up when components unmount.
2. **Third-Party API Data Normalization**: Overcame inconsistencies in the RapidAPI YouTube endpoints (where channel search endpoints omitted crucial `channelName` data inside video objects). Engineered an interceptor to dynamically inject missing payload data before passing it to the UI components, preventing catastrophic fallback UI rendering.
3. **Flexbox & SVG Chart Constraints**: Resolved notorious CSS layout blowouts caused by `recharts`'s `ResponsiveContainer` expanding infinitely inside Flexbox (`Stack`) layouts by enforcing strict `min-width` and `overflow` constraints.

## 🛠 Tech Stack

- **Frontend**: React 18, React Router v6
- **State Management & Fetching**: React Query v5, Axios
- **UI & Styling**: Material UI (MUI v5), Emotion, CSS3
- **Data Visualization**: Recharts
- **Artificial Intelligence**: Google Generative AI (Gemini SDK)
- **APIs**: YouTube Search and Download (RapidAPI), Gemini Public Ticker API

## 📸 Screenshots

<details>
  <summary>Click to view screenshots</summary>
  
  <br/>
  <img width="100%" alt="Screenshot 1" src="https://github.com/user-attachments/assets/3c312eee-8a7f-43cd-8220-9693d1933b14" />
  <img width="100%" alt="Screenshot 2" src="https://github.com/user-attachments/assets/0a6fe8cc-d8db-435c-8cb3-c2b752be5669" />
  <img width="100%" alt="Screenshot 3" src="https://github.com/user-attachments/assets/b10c4b4a-ac06-46b3-839a-81300bed13c5" />
  <img width="100%" alt="Screenshot 4" src="https://github.com/user-attachments/assets/fcd4b092-5a8e-4c83-bb37-8e7c3b5eb57f" />
  <img width="100%" alt="Screenshot 5" src="https://github.com/user-attachments/assets/6bc188c7-9630-4d02-8ae9-cfc901f7a5ca" />
</details>

## 💻 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/video-box.git
   cd video-box
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   REACT_APP_RAPID_API_KEY=your_rapidapi_key
   REACT_APP_GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   *The application will open at `http://localhost:3000`.*

---

<p align="center">
  <i>Built with passion and a relentless focus on performance.</i>
</p>
