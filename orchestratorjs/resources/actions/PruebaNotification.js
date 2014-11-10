module.exports = {

  // the body
  body: function ( dev ) {
    
    dev.notificationCapability.showNotificationTimeout("Hola!", "Esto es un mensaje enviado desde OJS", 10);
    //dev.notificationCapability.showToast("Hola!!", 0);
  }

};