import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";
import PWAUpdatePrompt from "./components/PWAUpdatePrompt";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms/:roomId" element={<RoomPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
          
        <AppFooter />
        <PWAUpdatePrompt />
      </div>
    </BrowserRouter>
  );
}

export default App;