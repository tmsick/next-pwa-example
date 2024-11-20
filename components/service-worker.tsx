"use client"

import { useEffect } from "react"

const ServiceWorker: React.FC = () => {
  const path = "/service-worker.js"

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return
    }

    navigator.serviceWorker
      .register(path)
      .then(registration => {
        console.log(`Service worker registered with scope: ${registration.scope}`)
      })
      .catch(error => {
        console.warn(`Failed in registering service worker: ${error}`)
      })
  }, [])

  return null
}

export default ServiceWorker
