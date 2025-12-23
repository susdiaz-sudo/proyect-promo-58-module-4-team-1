import { Routes, Route } from "react-router";

import "../styles/App.scss";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import CreatorPage from "./CreatorPage";
import LandingPage from "./LandingPage";

const serverUrl = import.meta.env.PROD
  ? "https://proyect-promo-58-module-4-team-1.onrender.com"
  : "http://localhost:3000";

function App() {
  return (
    <div className="container">
      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<LandingPage serverUrl={serverUrl} />} />
          <Route path="/creator" element={<CreatorPage serverUrl={serverUrl} />} />
          <Route path="*" element={<p>Error 404: Página no encontrada</p>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
