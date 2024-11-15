const version = 1

self.addEventListener("push", event => {
  const text = event.data.text()
  event.waitUntil(event.waitUntil(self.registration.showNotification(text, { body: text.toUpperCase() })))
})
