"use client"

import dynamic from "next/dynamic"

const PushNotification = dynamic(() => import("@/components/push-notification"), { ssr: false })

const Page = () => {
  return (
    <div>
      <PushNotification />
    </div>
  )
}

export default Page
