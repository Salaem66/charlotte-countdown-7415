import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Clock, Cake, MoonStars } from 'lucide-react'

const App = () => {
  const [targetDate, setTargetDate] = useState(new Date('2024-06-01T00:00:00'))
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeRemaining({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const handleDateChange = (event) => {
    setTargetDate(new Date(event.target.value))
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-300 to-pink-500">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-pink-500 mb-4">
          <Heart className="inline-block mr-2" />
          Charlotte's Countdown
          <Heart className="inline-block ml-2" />
        </h1>

        <div className="flex justify-center mb-8">
          <input
            type="datetime-local"
            value={targetDate.toISOString().slice(0, 16)}
            onChange={handleDateChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-pink-500">{timeRemaining.days}</span>
            <span className="text-gray-500">
              <Clock className="inline-block mr-2" />
              Days
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-pink-500">{timeRemaining.hours}</span>
            <span className="text-gray-500">
              <Clock className="inline-block mr-2" />
              Hours
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-pink-500">{timeRemaining.minutes}</span>
            <span className="text-gray-500">
              <Clock className="inline-block mr-2" />
              Minutes
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-pink-500">{timeRemaining.seconds}</span>
            <span className="text-gray-500">
              <Clock className="inline-block mr-2" />
              Seconds
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
            <Cake className="inline-block mr-2" />
            Set Birthday
          </button>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg flex items-center ml-4">
            <MoonStars className="inline-block mr-2" />
            Set Night Mode
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default App