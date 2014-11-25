
module.exports = {

  // the body
  body: function ( dev ) {
    
    var name = "Jose";
    var bmac = "00:09:88:9a:cf:2e";
    dev.locateCapability.setTargetBluetooth( name, bmac, "" );

  }

};