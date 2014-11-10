module.exports = {

  // the body
  body: function ( dev, title, message, timeout ) {
    
    dev.notificationCapability.showNotificationTimeout(title, message, parseInt(timeout));
  }

};