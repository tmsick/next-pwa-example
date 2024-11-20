"use client"

import useFcm from "@/hooks/use-fcm"
import { useState } from "react"

const PushNotification = () => {
  const [permissionState, getFcmToken] = useFcm()

  const [token, setToken] = useState("")

  const handleClick = () => {
    navigator.clipboard.writeText(token)
  }

  const handleClickPermission = async () => {
    const token = await getFcmToken()
    setToken(token)
  }

  return (
    <div>
      <div>
        <button onClick={handleClickPermission}>Get notification permission</button>
      </div>
      <div>
        Permission state: <code>{permissionState}</code>
      </div>
      <div>
        <label>
          Token:
          <input type="text" value={token} readOnly />
        </label>
        <button type="button" onClick={handleClick}>
          Copy
        </button>
      </div>
    </div>
  )
}

export default PushNotification
