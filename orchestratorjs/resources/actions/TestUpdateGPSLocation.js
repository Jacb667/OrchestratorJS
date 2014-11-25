
module.exports = {

  // the body
  body: function ( dev ) {

    var name = "Jose";
    var coords = "[47.2814193,8.8289845]";
    dev.locateCapability.updateTargetPosition( name, coords );

  }

};