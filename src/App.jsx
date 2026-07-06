import { useState } from 'react'
import CarCard from './components/CarCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-6'>
        <CarCard/>
        <CarCard/>
        <CarCard/>
        <CarCard/>
        <CarCard/>
        <CarCard/>
        <CarCard/>
      </div>
    </div>
  )
}

export default App
