import axios from "axios"
import React, { useState } from "react"

import "./style.css"

require("dotenv").config()
const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [locationInfo, setLocationInfo] = useState("")

  const fetchLocation = async () => {
    setLoading(true)

    try {
      // Step 1: Get user's IP address
      const ipResponse = await axios.get("https://api.ipify.org?format=json")
      const ipAddress = ipResponse.data.ip

      // Step 2: Get Country and City from IP Address
      const apiKey = process.env.PLASMO_PUBLIC_IPINFO_API_KEY
      const locationResponse = await axios.get(
        `https://ipinfo.io/${ipAddress}/json?token=${apiKey}`
      )
      const { country, city } = locationResponse.data

      setLocationInfo(`Your country is ${country} and city is ${city}`)
    } catch (error) {
      console.error("Error fetching location:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-500 h-500 bg-white rounded-md shadow-lg p-8">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 transition-colors"
          onClick={fetchLocation}
          disabled={loading}>
          {loading ? "Loading..." : "Show my location"}
        </button>
        {locationInfo && (
          <p className="mt-4 text-center text-gray-700">{locationInfo}</p>
        )}
      </div>
    </div>
  )
}

export default App
