import { useState } from 'react'
import Navbar from './pages/header/Navbar'
function App() {
  const [count, setCount] = useState(0)
  function myFunction(count) {
    setCount(count + 1);
  }

  return (
    <>
      <Navbar />
    </>
  )
}

export default App
