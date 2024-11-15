import { PushNotification } from "@/components/push-notification"
import { ServiceWorker } from "@/components/service-worker"

const Page = () => {
  return (
    <div>
      <div>Hello, world</div>
      <div>
        <ServiceWorker scriptURL="/service-worker.js" />
        <PushNotification />
      </div>
    </div>
  )
}

export default Page
