importScripts('https://www.gstatic.com/firebasejs/7.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.5.2/firebase-messaging.js');

// Initialize Firebase
var config = {
    apiKey: "api key",
    authDomain: "domain",
    databaseURL: "database",
    projectId: "id",
    storageBucket: "bucket",
    messagingSenderId: "sender id",
    appId: "app id"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {

    const title = "Hello World";
    const options = {
        body: payload.data.status
    };

    return self.registration.showNotification(title,options);
});
