"use client"

import { useEffect, useState } from "react"

const PushNotification = () => {
  const [token, setToken] = useState("")

  const handleClick = () => {
    navigator.clipboard.writeText(token)
  }

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return
    }

    if (!("PushManager" in window)) {
      return
    }

    ;(async () => {
      let registration = await navigator.serviceWorker.getRegistration()
      if (!registration) {
        registration = await navigator.serviceWorker.register("/service-worker.js")
      }

      const { getFcmToken } = await import("@/firebase")
      const token = await getFcmToken({
        serviceWorkerRegistration: registration,
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
      })

      if (!token) {
        return
      }

      setToken(token)
    })().catch(error => {
      alert(`Failed to get fcm token: ${error}`)
    })
  }, [])

  return (
    <div>
      <label>
        Token:
        <input type="text" value={token} readOnly />
      </label>
      <button type="button" onClick={handleClick}>
        Copy
      </button>
    </div>
  )
}

export default PushNotification
