"use client"

import { useEffect, useState } from "react"
import { getToken } from "@firebase/messaging"
import { messaging } from "@/firebase"

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

    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration =>
        getToken(messaging, {
          serviceWorkerRegistration: registration,
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
        }),
      )
      .then(token => setToken(token))
      .catch(error => alert(error))
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
