
module.exports = {

  // the body
  body: function ( dev, contact ) {
    
    dev.locateCapability.askLocatePerson( "Enter the name of the person you are looking.", contact );

  }

};