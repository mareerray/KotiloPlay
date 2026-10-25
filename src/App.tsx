import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
          
        <AppFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;