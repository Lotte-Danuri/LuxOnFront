// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyAHFnEL7qoOi2fQB9opoZeOFFy9MUH7GDM',
  projectId: 'luxon-c4fb2',
  messagingSenderId: '626968263040',
  appId: '1:626968263040:web:874cdbaa275151e4daa965',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// 백그라운드 상태에서 받은 알림 처리
messaging.setBackgroundMessageHandler(payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
