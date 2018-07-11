const config = {
  messagingSenderId: "1051075096946"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
// TODO: Figure out how to handle background messages.
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.text,
    icon: '/icon.png'
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
