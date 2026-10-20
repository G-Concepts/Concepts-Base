import { useState } from "react";
import Navbar from "./pages/header/Navbar";
import Footer from "./pages/footer/footer";
import HeroSection from "./components/heroSection";
function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
