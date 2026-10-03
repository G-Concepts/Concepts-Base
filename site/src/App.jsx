import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0)
  function myFunction(count) {
    setCount(count + 1);
  }

  return (
    <>
      <button onClick={() => myFunction(count)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add
      </button>
      <p>Count: {count}</p>
    </>
  )
}

export default App
