import { Routes, Route } from "react-router";

import "../styles/App.scss";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import CreatorPage from "./CreatorPage";
import LandingPage from "./LandingPage";

function App() {
  return (
    <div className="container">
      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/creator" element={<CreatorPage/>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
