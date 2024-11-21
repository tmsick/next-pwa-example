"use client"

import { type PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

type Props = {
  scriptURL: string
  options?: RegistrationOptions
}

type ServiceWorkerState = {
  loading: boolean
  sw: ServiceWorkerRegistration | null
}

const ServiceWorkerContext = createContext<ServiceWorkerState>({ loading: true, sw: null })

export const useServiceWorker = () => useContext(ServiceWorkerContext)

export const ServiceWorkerProvider: React.FC<PropsWithChildren<Props>> = ({ children, scriptURL, options }) => {
  const [state, setState] = useState<ServiceWorkerState>({ loading: true, sw: null })

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      setState({ loading: false, sw: null })
      return
    }

    navigator.serviceWorker
      .register(scriptURL, options)
      .then(sw => {
        setState({ loading: false, sw })
      })
      .catch(error => {
        console.error("Service Worker registration failed:", error)
        setState({ loading: false, sw: null })
      })
  }, [scriptURL, options])

  return <ServiceWorkerContext.Provider value={state}>{children}</ServiceWorkerContext.Provider>
}
