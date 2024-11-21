"use client"

import { getToken as fcmGetToken, isSupported as fcmIsSupported } from "@firebase/messaging"
import { useEffect, useState } from "react"
import { useServiceWorker } from "@/components/service-worker-provider"

export const useFcm = () => {
  const { loading, sw } = useServiceWorker()

  const [isSupported, setIsSupported] = useState(false)
  const [permissionState, setPermissionState] = useState<PermissionState>("prompt")

  const [getToken, setGetToken] = useState<(() => Promise<string>) | null>(null)

  useEffect(() => {
    fcmIsSupported().then(setIsSupported)
  }, [])

  useEffect(() => {
    if (loading || !sw || !isSupported || permissionState === "denied") {
      return
    }

    ;(async () => {
      const { messaging } = await import("@/firebase")

      const getToken = () =>
        fcmGetToken(messaging, {
          serviceWorkerRegistration: sw,
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
        }).finally(async () => {
          setPermissionState(await sw.pushManager.permissionState({ userVisibleOnly: true }))
        })

      setGetToken(() => getToken)
      setPermissionState(await sw.pushManager.permissionState({ userVisibleOnly: true }))
    })()
  }, [isSupported, loading, permissionState, sw])

  return { getToken, isSupported, permissionState }
}
