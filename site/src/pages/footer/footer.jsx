import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#1F3A12] text-white py-8">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Global Concepts. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="text-white hover:text-gray-300">Privacy Policy</a>
                    <a href="#" className="text-white hover:text-gray-300">Terms of Service</a>
                    <a href="#" className="text-white hover:text-gray-300">Contact Us</a>
                </div>
            </div>
        </div>
    </footer>
  )
}
