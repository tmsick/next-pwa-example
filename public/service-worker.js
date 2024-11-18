self.addEventListener("push", event => {
  const json = event.data.json()

  const title = json.notification.title
  const body = json.notification.body
  const link = json.notification.click_action

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      data: { url: link },
    }),
  )
})

self.addEventListener("notificationclick", event => {
  event.notification.close()

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then(windowClients => {
        for (const client of windowClients) {
          if (client.url === event.notification.data.url && "focus" in client) {
            return client.focus()
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url)
        }
      }),
  )
})
