"use client"

import React, { useEffect } from "react"

export type Props = {
  scriptURL: string | URL
  options?: RegistrationOptions
}

export const ServiceWorker: React.FC<Props> = ({ scriptURL, options }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(scriptURL, options)
        .then(registration => {
          console.log("ServiceWorker registration successful with scope:", registration.scope)
        })
        .catch(error => {
          console.log("ServiceWorker registration failed:", error)
        })
    }
  }, [scriptURL, options])

  return null
}
