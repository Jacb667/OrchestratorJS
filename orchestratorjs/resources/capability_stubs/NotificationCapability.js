module.exports = {

    showNotification: function(title,message) {
        var methodArguments = ['NotificationCapability', 'showNotification', [title,message]];
        return this.device.invoke(methodArguments);
    },
    showNotificationTimeout: function(title,message,seconds) {
        var methodArguments = ['NotificationCapability', 'showNotificationTimeout', [title,message,seconds]];
        return this.device.invoke(methodArguments);
    },
    showToast: function(message,seconds) {
        var methodArguments = ['NotificationCapability', 'showToast', [message,seconds]];
        return this.device.invoke(methodArguments);
    },
};