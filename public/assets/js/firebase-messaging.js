/*! @license Firebase v4.2.0
Build: rev-d6b2db4
Terms: https://firebase.google.com/terms/ */

try{webpackJsonpFirebase([2],{24:function(e,t,r){"use strict";function n(e){var t=new Uint8Array(e);return window.btoa(String.fromCharCode.apply(null,t))}function o(e){var t=function(e){return self&&"ServiceWorkerGlobalScope"in self?new F(e):new D(e)},r={Messaging:D};e.INTERNAL.registerService("messaging",t,r)}Object.defineProperty(t,"__esModule",{value:!0});var i,s={AVAILABLE_IN_WINDOW:"only-available-in-window",AVAILABLE_IN_SW:"only-available-in-sw",SHOULD_BE_INHERITED:"should-be-overriden",BAD_SENDER_ID:"bad-sender-id",INCORRECT_GCM_SENDER_ID:"incorrect-gcm-sender-id",PERMISSION_DEFAULT:"permission-default",PERMISSION_BLOCKED:"permission-blocked",UNSUPPORTED_BROWSER:"unsupported-browser",NOTIFICATIONS_BLOCKED:"notifications-blocked",FAILED_DEFAULT_REGISTRATION:"failed-serviceworker-registration",SW_REGISTRATION_EXPECTED:"sw-registration-expected",GET_SUBSCRIPTION_FAILED:"get-subscription-failed",INVALID_SAVED_TOKEN:"invalid-saved-token",SW_REG_REDUNDANT:"sw-reg-redundant",TOKEN_SUBSCRIBE_FAILED:"token-subscribe-failed",TOKEN_SUBSCRIBE_NO_TOKEN:"token-subscribe-no-token",TOKEN_SUBSCRIBE_NO_PUSH_SET:"token-subscribe-no-push-set",USE_SW_BEFORE_GET_TOKEN:"use-sw-before-get-token",INVALID_DELETE_TOKEN:"invalid-delete-token",DELETE_TOKEN_NOT_FOUND:"delete-token-not-found",DELETE_SCOPE_NOT_FOUND:"delete-scope-not-found",BG_HANDLER_FUNCTION_EXPECTED:"bg-handler-function-expected",NO_WINDOW_CLIENT_TO_MSG:"no-window-client-to-msg",UNABLE_TO_RESUBSCRIBE:"unable-to-resubscribe",NO_FCM_TOKEN_FOR_RESUBSCRIBE:"no-fcm-token-for-resubscribe",FAILED_TO_DELETE_TOKEN:"failed-to-delete-token",NO_SW_IN_REG:"no-sw-in-reg",BAD_SCOPE:"bad-scope",BAD_VAPID_KEY:"bad-vapid-key",BAD_SUBSCRIPTION:"bad-subscription",BAD_TOKEN:"bad-token",BAD_PUSH_SET:"bad-push-set",FAILED_DELETE_VAPID_KEY:"failed-delete-vapid-key"},a=(i={},i[s.AVAILABLE_IN_WINDOW]="This method is available in a Window context.",i[s.AVAILABLE_IN_SW]="This method is available in a service worker context.",i["should-be-overriden"]="This method should be overriden by extended classes.",i["bad-sender-id"]="Please ensure that 'messagingSenderId' is set correctly in the options passed into firebase.initializeApp().",i["permission-default"]="The required permissions were not granted and dismissed instead.",i["permission-blocked"]="The required permissions were not granted and blocked instead.",i["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",i["notifications-blocked"]="Notifications have been blocked.",i[s.FAILED_DEFAULT_REGISTRATION]="We are unable to register the default service worker. {$browserErrorMessage}",i["sw-registration-expected"]="A service worker registration was the expected input.",i["get-subscription-failed"]="There was an error when trying to get any existing Push Subscriptions.",i["invalid-saved-token"]="Unable to access details of the saved token.",i["sw-reg-redundant"]="The service worker being used for push was made redundant.",i["token-subscribe-failed"]="A problem occured while subscribing the user to FCM: {$message}",i["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",i["token-subscribe-no-push-set"]="FCM returned an invalid response when getting an FCM token.",i["use-sw-before-get-token"]="You must call useServiceWorker() before calling getToken() to ensure your service worker is used.",i["invalid-delete-token"]="You must pass a valid token into deleteToken(), i.e. the token from getToken().",i["delete-token-not-found"]="The deletion attempt for token could not be performed as the token was not found.",i["delete-scope-not-found"]="The deletion attempt for service worker scope could not be performed as the scope was not found.",i["bg-handler-function-expected"]="The input to setBackgroundMessageHandler() must be a function.",i["no-window-client-to-msg"]="An attempt was made to message a non-existant window client.",i["unable-to-resubscribe"]="There was an error while re-subscribing the FCM token for push messaging. Will have to resubscribe the user on next visit. {$message}",i["no-fcm-token-for-resubscribe"]="Could not find an FCM token and as a result, unable to resubscribe. Will have to resubscribe the user on next visit.",i["failed-to-delete-token"]="Unable to delete the currently saved token.",i["no-sw-in-reg"]="Even though the service worker registration was successful, there was a problem accessing the service worker itself.",i["incorrect-gcm-sender-id"]="Please change your web app manifest's 'gcm_sender_id' value to '103953800507' to use Firebase messaging.",i["bad-scope"]="The service worker scope must be a string with at least one character.",i["bad-vapid-key"]="The public VAPID key must be a string with at least one character.",i["bad-subscription"]="The subscription must be a valid PushSubscription.",i["bad-token"]="The FCM Token used for storage / lookup was not a valid token string.",i["bad-push-set"]="The FCM push set used for storage / lookup was not not a valid push set string.",i["failed-delete-vapid-key"]="The VAPID key could not be deleted.",i),c={codes:s,map:a},u=function(e){return n(e).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")},_=[4,51,148,247,223,161,235,177,220,3,162,94,21,113,219,72,211,46,237,237,178,52,219,183,71,58,12,143,196,204,225,111,60,140,132,223,171,182,102,62,242,12,212,139,254,227,249,118,47,20,28,99,8,106,111,45,177,26,149,176,206,55,192,156,110],f={userVisibleOnly:!0,applicationServerKey:new Uint8Array(_)},d={ENDPOINT:"https://fcm.googleapis.com",APPLICATION_SERVER_KEY:_,SUBSCRIPTION_OPTIONS:f},h=r(10),p="fcm_token_object_Store",l=function(){function e(){this.e=new h.a("messaging","Messaging",c.map),this.t=null}return e.prototype.r=function(){return this.t?this.t:(this.t=new Promise(function(e,t){var r=indexedDB.open("fcm_token_details_db",1);r.onerror=function(e){t(e.target.error)},r.onsuccess=function(t){e(t.target.result)},r.onupgradeneeded=function(e){var t=e.target.result,r=t.createObjectStore(p,{keyPath:"swScope"});r.createIndex("fcmSenderId","fcmSenderId",{unique:!1}),r.createIndex("fcmToken","fcmToken",{unique:!0})}}),this.t)},e.prototype.closeDatabase=function(){var e=this;return this.t?this.t.then(function(t){t.close(),e.t=null}):Promise.resolve()},e.prototype.getTokenDetailsFromToken=function(e){return this.r().then(function(t){return new Promise(function(r,n){var o=t.transaction([p]),i=o.objectStore(p),s=i.index("fcmToken"),a=s.get(e);a.onerror=function(e){n(e.target.error)},a.onsuccess=function(e){r(e.target.result)}})})},e.prototype.n=function(e){return this.r().then(function(t){return new Promise(function(r,n){var o=t.transaction([p]),i=o.objectStore(p),s=i.get(e);s.onerror=function(e){n(e.target.error)},s.onsuccess=function(e){r(e.target.result)}})})},e.prototype.o=function(e){return this.r().then(function(t){return new Promise(function(r,n){var o=t.transaction([p]),i=o.objectStore(p),s=[],a=i.openCursor();a.onerror=function(e){n(e.target.error)},a.onsuccess=function(t){var n=t.target.result;n?(n.value.fcmSenderId===e&&s.push(n.value),n.continue()):r(s)}})})},e.prototype.subscribeToFCM=function(e,t,r){var n=this,o=u(t.getKey("p256dh")),i=u(t.getKey("auth")),s="authorized_entity="+e+"&endpoint="+t.endpoint+"&encryption_key="+o+"&encryption_auth="+i;r&&(s+="&pushSet="+r);var a=new Headers;a.append("Content-Type","application/x-www-form-urlencoded");var _={method:"POST",headers:a,body:s};return fetch(d.ENDPOINT+"/fcm/connect/subscribe",_).then(function(e){return e.json()}).then(function(e){var t=e;if(t.error){var r=t.error.message;throw n.e.create(c.codes.TOKEN_SUBSCRIBE_FAILED,{message:r})}if(!t.token)throw n.e.create(c.codes.TOKEN_SUBSCRIBE_NO_TOKEN);if(!t.pushSet)throw n.e.create(c.codes.TOKEN_SUBSCRIBE_NO_PUSH_SET);return{token:t.token,pushSet:t.pushSet}})},e.prototype.i=function(e,t){return e.endpoint===t.endpoint&&u(e.getKey("auth"))===t.auth&&u(e.getKey("p256dh"))===t.p256dh},e.prototype.s=function(e,t,r,n,o){var i={swScope:t.scope,endpoint:r.endpoint,auth:u(r.getKey("auth")),p256dh:u(r.getKey("p256dh")),fcmToken:n,fcmPushSet:o,fcmSenderId:e};return this.r().then(function(e){return new Promise(function(t,r){var n=e.transaction([p],"readwrite"),o=n.objectStore(p),s=o.put(i);s.onerror=function(e){r(e.target.error)},s.onsuccess=function(e){t()}})})},e.prototype.getSavedToken=function(e,t){var r=this;return t instanceof ServiceWorkerRegistration?"string"!=typeof e||0===e.length?Promise.reject(this.e.create(c.codes.BAD_SENDER_ID)):this.o(e).then(function(r){if(0!==r.length){var n=r.findIndex(function(r){return t.scope===r.swScope&&e===r.fcmSenderId});if(-1!==n)return r[n]}}).then(function(e){if(e)return t.pushManager.getSubscription().catch(function(e){throw r.e.create(c.codes.GET_SUBSCRIPTION_FAILED)}).then(function(t){if(t&&r.i(t,e))return e.fcmToken})}):Promise.reject(this.e.create(c.codes.SW_REGISTRATION_EXPECTED))},e.prototype.createToken=function(e,t){var r=this;if("string"!=typeof e||0===e.length)return Promise.reject(this.e.create(c.codes.BAD_SENDER_ID));if(!(t instanceof ServiceWorkerRegistration))return Promise.reject(this.e.create(c.codes.SW_REGISTRATION_EXPECTED));var n,o;return t.pushManager.getSubscription().then(function(e){return e||t.pushManager.subscribe(d.SUBSCRIPTION_OPTIONS)}).then(function(t){return n=t,r.subscribeToFCM(e,n)}).then(function(i){return o=i,r.s(e,t,n,o.token,o.pushSet)}).then(function(){return o.token})},e.prototype.deleteToken=function(e){var t=this;return"string"!=typeof e||0===e.length?Promise.reject(this.e.create(c.codes.INVALID_DELETE_TOKEN)):this.getTokenDetailsFromToken(e).then(function(e){if(!e)throw t.e.create(c.codes.DELETE_TOKEN_NOT_FOUND);return t.r().then(function(r){return new Promise(function(n,o){var i=r.transaction([p],"readwrite"),s=i.objectStore(p),a=s.delete(e.swScope);a.onerror=function(e){o(e.target.error)},a.onsuccess=function(r){if(0===r.target.result)return void o(t.e.create(c.codes.FAILED_TO_DELETE_TOKEN));n(e)}})})})},e}(),g=l,E=r(10),S="messagingSenderId",T=function(){function e(e){var t=this;if(this.e=new E.a("messaging","Messaging",c.map),!e.options[S]||"string"!=typeof e.options[S])throw this.e.create(c.codes.BAD_SENDER_ID);this.c=e.options[S],this.u=new g,this.app=e,this.INTERNAL={},this.INTERNAL.delete=function(){return t.delete}}return e.prototype.getToken=function(){var e=this,t=this._();return"granted"!==t?"denied"===t?Promise.reject(this.e.create(c.codes.NOTIFICATIONS_BLOCKED)):Promise.resolve(null):this.f().then(function(t){return e.u.getSavedToken(e.c,t).then(function(r){return r||e.u.createToken(e.c,t)})})},e.prototype.deleteToken=function(e){var t=this;return this.u.deleteToken(e).then(function(){return t.f().then(function(e){if(e)return e.pushManager.getSubscription()}).then(function(e){if(e)return e.unsubscribe()})})},e.prototype.f=function(){throw this.e.create(c.codes.SHOULD_BE_INHERITED)},e.prototype.requestPermission=function(){throw this.e.create(c.codes.AVAILABLE_IN_WINDOW)},e.prototype.useServiceWorker=function(e){throw this.e.create(c.codes.AVAILABLE_IN_WINDOW)},e.prototype.onMessage=function(e,t,r){throw this.e.create(c.codes.AVAILABLE_IN_WINDOW)},e.prototype.onTokenRefresh=function(e,t,r){throw this.e.create(c.codes.AVAILABLE_IN_WINDOW)},e.prototype.setBackgroundMessageHandler=function(e){throw this.e.create(c.codes.AVAILABLE_IN_SW)},e.prototype.delete=function(){this.u.closeDatabase()},e.prototype._=function(){return Notification.permission},e.prototype.getTokenManager=function(){return this.u},e}(),b=T,m={TYPE_OF_MSG:"firebase-messaging-msg-type",DATA:"firebase-messaging-msg-data"},v={PUSH_MSG_RECEIVED:"push-msg-received",NOTIFICATION_CLICKED:"notification-clicked"},I=function(e,t){return r={},r[m.TYPE_OF_MSG]=e,r[m.DATA]=t,r;var r},y={PARAMS:m,TYPES_OF_MSG:v,createNewMsg:I},N={path:"/firebase-messaging-sw.js",scope:"/firebase-cloud-messaging-push-scope"},w=r(13),k=this&&this.d||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),O=function(e){function t(t){var r=e.call(this,t)||this;return r.h,r.p,r.l=null,r.g=Object(w.a)(function(e){r.l=e}),r.S=null,r.T=Object(w.a)(function(e){r.S=e}),r.b(),r}return k(t,e),t.prototype.getToken=function(){var t=this;return this.m()?this.v().then(function(){return e.prototype.getToken.call(t)}):Promise.reject(this.e.create(c.codes.UNSUPPORTED_BROWSER))},t.prototype.v=function(){var e=this;if(this.p)return this.p;var t=document.querySelector('link[rel="manifest"]');return this.p=t?fetch(t.href).then(function(e){return e.json()}).catch(function(){return Promise.resolve()}).then(function(t){if(t&&t.gcm_sender_id&&"103953800507"!==t.gcm_sender_id)throw e.e.create(c.codes.INCORRECT_GCM_SENDER_ID)}):Promise.resolve(),this.p},t.prototype.requestPermission=function(){var e=this;return"granted"===Notification.permission?Promise.resolve():new Promise(function(t,r){var n=function(n){return"granted"===n?t():r("denied"===n?e.e.create(c.codes.PERMISSION_BLOCKED):e.e.create(c.codes.PERMISSION_DEFAULT))},o=Notification.requestPermission(function(e){o||n(e)});o&&o.then(n)})},t.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw this.e.create(c.codes.SW_REGISTRATION_EXPECTED);if(void 0!==this.h)throw this.e.create(c.codes.USE_SW_BEFORE_GET_TOKEN);this.h=e},t.prototype.onMessage=function(e,t,r){return this.g(e,t,r)},t.prototype.onTokenRefresh=function(e,t,r){return this.T(e,t,r)},t.prototype.I=function(e){var t=this,r=e.installing||e.waiting||e.active;return new Promise(function(n,o){if(!r)return void o(t.e.create(c.codes.NO_SW_IN_REG));if("activated"===r.state)return void n(e);if("redundant"===r.state)return void o(t.e.create(c.codes.SW_REG_REDUNDANT));var i=function i(){if("activated"===r.state)n(e);else{if("redundant"!==r.state)return;o(t.e.create(c.codes.SW_REG_REDUNDANT))}r.removeEventListener("statechange",i)};r.addEventListener("statechange",i)})},t.prototype.f=function(){var e=this;return this.h?this.I(this.h):(this.h=null,navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:N.scope}).catch(function(t){throw e.e.create(c.codes.FAILED_DEFAULT_REGISTRATION,{browserErrorMessage:t.message})}).then(function(t){return e.I(t).then(function(){return e.h=t,t.update(),t})}))},t.prototype.b=function(){var e=this;"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("message",function(t){if(t.data&&t.data[y.PARAMS.TYPE_OF_MSG]){var r=t.data;switch(r[y.PARAMS.TYPE_OF_MSG]){case y.TYPES_OF_MSG.PUSH_MSG_RECEIVED:case y.TYPES_OF_MSG.NOTIFICATION_CLICKED:var n=r[y.PARAMS.DATA];e.l.next(n)}}},!1)},t.prototype.m=function(){return"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")},t}(b),D=O,A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P=this&&this.d||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),R=function(e){function t(t){var r=e.call(this,t)||this;return self.addEventListener("push",function(e){return r.y(e)},!1),self.addEventListener("pushsubscriptionchange",function(e){return r.N(e)},!1),self.addEventListener("notificationclick",function(e){return r.w(e)},!1),r.k=null,r}return P(t,e),t.prototype.y=function(e){var t,r=this;try{t=e.data.json()}catch(e){return}var n=this.O().then(function(e){if(e){if(t.notification||r.k)return r.D(t)}else{var n=r.A(t);if(n){var o=n.title||"";return self.registration.showNotification(o,n)}if(r.k)return r.k(t)}});e.waitUntil(n)},t.prototype.N=function(e){var t=this,r=this.getToken().then(function(e){if(!e)throw t.e.create(c.codes.NO_FCM_TOKEN_FOR_RESUBSCRIBE);var r=null,n=t.getTokenManager();return n.getTokenDetailsFromToken(e).then(function(e){if(!(r=e))throw t.e.create(c.codes.INVALID_SAVED_TOKEN);return self.registration.pushManager.subscribe(d.SUBSCRIPTION_OPTIONS)}).then(function(e){return n.subscribeToFCM(r.fcmSenderId,e,r.fcmPushSet)}).catch(function(e){return n.deleteToken(r.fcmToken).then(function(){throw t.e.create(c.codes.UNABLE_TO_RESUBSCRIBE,{message:e})})})});e.waitUntil(r)},t.prototype.w=function(e){var t=this;if(e.notification&&e.notification.data&&e.notification.data.FCM_MSG){e.stopImmediatePropagation(),e.notification.close();var r=e.notification.data.FCM_MSG,n=r.notification.click_action;if(n){var o=this.P(n).then(function(e){return e||self.clients.openWindow(n)}).then(function(e){if(e){r.notification,delete r.notification;var n=y.createNewMsg(y.TYPES_OF_MSG.NOTIFICATION_CLICKED,r);return t.R(e,n)}});e.waitUntil(o)}}},t.prototype.A=function(e){if(e&&"object"===A(e.notification)){var t=Object.assign({},e.notification);return t.data=(r={},r.FCM_MSG=e,r),t;var r}},t.prototype.setBackgroundMessageHandler=function(e){if(e&&"function"!=typeof e)throw this.e.create(c.codes.BG_HANDLER_FUNCTION_EXPECTED);this.k=e},t.prototype.P=function(e){var t=new URL(e).href;return self.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(e){for(var r=null,n=0;n<e.length;n++)if(new URL(e[n].url).href===t){r=e[n];break}if(r)return r.focus(),r})},t.prototype.R=function(e,t){var r=this;return new Promise(function(n,o){if(!e)return o(r.e.create(c.codes.NO_WINDOW_CLIENT_TO_MSG));e.postMessage(t),n()})},t.prototype.O=function(){return self.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(e){return e.some(function(e){return"visible"===e.visibilityState})})},t.prototype.D=function(e){var t=this;return self.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(r){var n=y.createNewMsg(y.TYPES_OF_MSG.PUSH_MSG_RECEIVED,e);return Promise.all(r.map(function(e){return t.R(e,n)}))})},t.prototype.f=function(){return Promise.resolve(self.registration)},t}(b),F=R;t.registerMessaging=o,o(r(5).default)}},[24])}catch(e){throw Error("Cannot instantiate firebase-messaging.js - be sure to load firebase-app.js first.")}
//# sourceMappingURL=firebase-messaging.js.map
