
module.exports = {

  // the body
  body: function ( dev, name, bmac ) {
    
    dev.treasureCapability.setTargetBluetooth( name, bmac );

  }

};