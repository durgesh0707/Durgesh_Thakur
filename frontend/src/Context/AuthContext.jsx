import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const authDataContext = createContext()

function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000"

  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const fetchCurrentUser = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true, // ✅ this sends the token cookie
      })
      setCurrentUser(res.data.user)
      console.log("✅ User fetched:", res.data.user)
    } catch (err) {
      console.error("❌ Could not fetch user data", err.response?.data || err.message)
      setCurrentUser(null)
    } finally {
      setLoading(false)
    }
  }

  // ⏳ Automatically fetch user on app load
  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const value = {
    serverUrl,
    loading,
    setLoading,
    currentUser,
    setCurrentUser,
  }

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  )
}

export default AuthContext
