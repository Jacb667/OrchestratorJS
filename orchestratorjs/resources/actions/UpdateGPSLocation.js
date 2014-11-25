
module.exports = {

  // the body
  body: function ( dev, name, coords ) {
    
    dev.locateCapability.updateTargetPosition( name, coords );

  }

};