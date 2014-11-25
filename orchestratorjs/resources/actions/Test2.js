module.exports = {

  // the body
  body: function ( d1 ) {
    

    d1.notificationCapability.showNotificationJSON("Social information", 
       "The user has accepted your request, contact him at: ", 
                                                   "[{'Facebook':'cuenta@facebook'}, {'Twitter':'cuenta@twitter'}]");
  
  
  }
  
};
