// the body
this.body = function (dev1, dev2, hashTags, contact1, contact2) {
    
    var misc = require('./misc.js');
  
  console.log(contact1);
  console.log(contact2);
      
  	var message = 'A user was found in your surroundings with common Hash Tags:' +
    				      hashTags + '. Do you want to contact him?';
  
    dev1.dialogCapability.showDialog(message, ['YES','NO'], 60);
    dev2.dialogCapability.showDialog(message, ['YES','NO'], 60);
    while( !dev1.dialogCapability.getDialogChoice() ) {
      misc.sleep(1);
    }
    while( !dev2.dialogCapability.getDialogChoice() ) {
      misc.sleep(1);
    }

    var choice1 = dev1.dialogCapability.getDialogChoice();
  	var choice2 = dev2.dialogCapability.getDialogChoice();
    
  	console.log( dev1 + " CHOICE " + choice1);
  	console.log( dev2 + " CHOICE " + choice2);
  
    if (choice1 == "YES" && choice2 == "YES")
    {
    	dev1.notificationCapability.showNotificationJSON("Social information", "The user has accepted your request, contact him at: ", contact2);
  		dev2.notificationCapability.showNotificationJSON("Social information", "The user has accepted your request, contact him at: ", contact1);
    }
    	
};