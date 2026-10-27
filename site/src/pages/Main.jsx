import React from 'react'
import HeroSection from '../components/heroSection'
import About from '../components/HeroAbout'
export default function Main() {
  return (
      <main className="min-h-screen">
        <HeroSection />
        <About />
      </main>
  )
}
