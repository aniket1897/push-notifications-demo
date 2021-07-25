const check = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
}

// registering a service worker.
const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('service.js');
    return swRegistration;
}

const getPermissionFromUser = async () => {
    const perimission = await window.Notification.requestPermission();
    if(perimission !== "granted"){
        throw new Error("Permission not granted for notification");
    } else {
        console.info("Permission granted");
    }
}

const main = async () => {
    check();
    const swRegistration = await registerServiceWorker();
    await getPermissionFromUser();
}