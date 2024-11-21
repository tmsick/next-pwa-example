"use client"

import { useEffect, useState } from "react"
import { useFcm } from "@/hooks/use-fcm"

const Page = () => {
  const { getToken, isSupported, permissionState } = useFcm()

  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("isSupported", isSupported)
    console.log("permissionState", permissionState)
    console.log("token", token)
    console.log("--")
    ;(async () => {
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
    })()
  }, [getToken, isSupported, permissionState, token])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!!token && <p>Token: {token}</p>}
      {!loading && permissionState === "denied" && <p>Permission denied 😢</p>}
      {!loading && permissionState === "prompt" && <p>Permission prompt 🤔</p>}
    </div>
  )
}

export default Page
