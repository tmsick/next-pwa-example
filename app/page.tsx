"use client"

import { useEffect, useState } from "react"
import { useFcmToken } from "@/hooks/use-fcm"

const Page = () => {
  const { getToken, isSupported, permissionState } = useFcmToken()

  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("isSupported", isSupported)
    console.log("permissionState", permissionState)
    console.log("token", token)
    console.log("--")
  }, [isSupported, permissionState, token])

  const handleClick = async () => {
    setLoading(true)

    if (!getToken) {
      setLoading(false)
      return
    }

    try {
      setToken(await getToken())
    } catch (error) {
      console.warn(error)
    }
    setLoading(false)
  }

  return (
    <div>
      {isSupported && !!getToken && !token && (
        <button onClick={handleClick} disabled={loading || permissionState === "denied"}>
          Get token
        </button>
      )}
      {!!token && <p>Token: {token}</p>}
    </div>
  )
}

export default Page
