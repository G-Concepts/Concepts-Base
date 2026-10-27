import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/header/Navbar";
import Footer from "./pages/footer/footer";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            {/* Add these as you build the pages:
            <Route path="/contact" element={<Contact />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;