import { useState } from "react";
import Navbar from "./pages/header/Navbar";
import Footer from "./pages/footer/footer";
import HeroSection from "./components/heroSection";
import About from "./components/About";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <About />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
