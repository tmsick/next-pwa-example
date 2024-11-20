import { useState } from "react"

type GetFcmTokenFunc = () => Promise<string>

export default function useFcm(): [PermissionState, GetFcmTokenFunc] {
  const [permissionState, setPermissionState] = useState<PermissionState>("prompt")

  const getFcmToken: GetFcmTokenFunc = async () => {
    if (!("serviceWorker" in navigator)) {
      setPermissionState("denied")
      return ""
    }

    if (!("PushManager" in window)) {
      setPermissionState("denied")
      return ""
    }

    const { getFcmToken } = await import("@/firebase")

    let registration: ServiceWorkerRegistration
    try {
      registration =
        (await navigator.serviceWorker.getRegistration()) ||
        (await navigator.serviceWorker.register("/service-worker.js"))
    } catch (error) {
      console.warn(`Failed to register service worker: ${error}`)
      setPermissionState("denied")
      return ""
    }

    let token: string
    try {
      token = await getFcmToken({
        serviceWorkerRegistration: registration,
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
      })
    } catch (error) {
      console.warn(`Failed to get fcm token: ${error}`)
      setPermissionState("denied")
      return ""
    }

    try {
      setPermissionState(await registration.pushManager.permissionState({ userVisibleOnly: true }))
    } catch (error) {
      console.warn(`Failed to get permission state: ${error}`)
      setPermissionState("denied")
    }

    return token
  }

  return [permissionState, getFcmToken]
}
