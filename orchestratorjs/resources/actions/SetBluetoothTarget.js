
module.exports = {

  // the body
  body: function ( dev, name, bmac, image ) {
    
    dev.locateCapability.setTargetBluetooth( name, bmac, image );

  }

};