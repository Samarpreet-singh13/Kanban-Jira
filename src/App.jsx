import { useState } from 'react'
import './App.css'
import Boards from './components/Board/Boards'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-200">
        <h1 className='text-2xl font-bold text-center py-6'>
          Kanaban board
          <Boards/>
        </h1>
      </div>
    </>
  )
}

export default App
