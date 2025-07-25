export const requestNotificationPermission = () => {
    console.log("requestNotificationPermission", Notification.permission)
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            new Notification("🔔 Уведомления активированы!");
        }
        });
    }
}
