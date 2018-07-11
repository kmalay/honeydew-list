import firebase from 'firebase';
import axios from 'axios';
import store from './store';
import { SHOW_SNACKBAR, SHOW_UPDATE_SNACKBAR } from './actions/types';

// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              console.log('New content is available; please refresh.');
              store.dispatch({ type: SHOW_UPDATE_SNACKBAR });
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');
              store.dispatch({
                type: SHOW_SNACKBAR,
                payload: { message: 'Content is cached for offline use.' }
              });
            }
          }
        };
      };

      const messaging = firebase.messaging();
      messaging.useServiceWorker(registration);
      messaging.requestPermission()
        .then(() => {
          // console.log('Notification permission granted.');
          messaging.getToken()
            .then(currentToken => {
              if (currentToken) {
                // console.log('Messaging token: ', currentToken);
                const url = `https://iid.googleapis.com/iid/v1/${currentToken}/rel/topics/admin`;
                const opts = { headers: { Authorization: `key=AIzaSyCAHLi71uZQramslnp6gr2GmtziMnTn1Q8` }};
                axios.post(url, null, opts)
                  .catch(err => { console.log('Error: ', err) });
              } else {
                console.log('No Instance ID token available. Request permission to generate one.');
              }
            })
            .catch(function(err) {
              console.log('An error occurred while retrieving token. ', err);
            });

            messaging.onTokenRefresh(function() {
              messaging.getToken()
                .then(refreshedToken => {
                  console.log('Token refreshed.');
                  const url = `https://iid.googleapis.com/iid/v1/${refreshedToken}/rel/topics/admin`;
                  const opts = { headers: { Authorization: `key=AIzaSyCAHLi71uZQramslnp6gr2GmtziMnTn1Q8` }};
                  axios.post(url, null, opts)
                    .then(response => { console.log(response.data); })
                    .catch(err => { console.log('Error: ', err) });
                })
                .catch(function(err) {
                  console.log('Unable to retrieve refreshed token ', err);
                });
            });
        })
        .catch(err => {
          console.log('Unable to get permission to notify.', err);
        });
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
