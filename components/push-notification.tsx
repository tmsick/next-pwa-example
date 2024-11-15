"use client"

import { useEffect, useState } from "react"

export const PushNotification = () => {
  const [supported, setSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)

  const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer | null) => {
    if (!arrayBuffer) {
      return ""
    }

    const uint8Array = new Uint8Array(arrayBuffer)
    const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), "")
    let s = btoa(binaryString)
    while (s.endsWith("=")) {
      s = s.slice(0, -1)
    }
    return s
  }

  const handleClick = () => {
    if (!supported) {
      return
    }

    navigator.serviceWorker.ready
      .then(registration => {
        return registration.pushManager.subscribe({
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
          userVisibleOnly: true,
        })
      })
      .then(subscription => {
        setSubscription(subscription)
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setSupported(true)
    }
  }, [])

  if (!supported) {
    return <p>Push notification is not supported in your browser.</p>
  }

  return (
    <div>
      <button onClick={handleClick}>Subscribe to push notification</button>
      {subscription && (
        <div>
          <div>
            <label>
              Endpoint:
              <input type="text" value={subscription.endpoint} readOnly />
            </label>
          </div>
          <div>
            <label>
              Expiration Time:
              <input type="text" value={subscription.expirationTime?.toString()} readOnly />
            </label>
          </div>
          <div>
            <label>
              P256DH:
              <input type="text" value={arrayBufferToBase64(subscription.getKey("p256dh"))} readOnly />
            </label>
          </div>
          <div>
            <label>
              Auth:
              <input type="text" value={arrayBufferToBase64(subscription.getKey("auth"))} readOnly />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
