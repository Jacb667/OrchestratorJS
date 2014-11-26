var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );

module.exports = {

  // Define here settings that the app needs from user
  // ( asked from the user s/he starts the app )
  settings: { deviceId: null, value: null },

  // Define your action triggering logic here
  logic: function() {

    // Example: pubsub observer for monitoring device online state
    pubsub.on( 'online', function( contextValue, deviceIdentity ) {

      if ( contextValue != true && settings.deviceId != deviceIdentity)
        return;

      // Example how an action can be triggered
      var params = {
        actionName: 'ActionName',
        parameters: [ 'device:' + deviceIdentity ]
      };

      httprequest( {
        uri: '/api/1/actioninstance',
        method: "POST",
        form: params
      }, function( error, response, body ) {} );

    } );
    

    // Example: periodic loop e.g. for polling a website
      Fiber( function() {
        
        // runs every ten seconds until the app gets stopped
        while ( true ) {

          console.log( 'tick' );

          tools.sleep( 10 );

        }

      } ).run();
  }
};