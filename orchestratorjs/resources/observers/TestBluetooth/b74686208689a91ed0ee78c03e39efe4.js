var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );

function executeActionDevice( actionName, parameters )
{
  var params = {
    actionName: actionName,
    parameters: parameters
  };

  httprequest( {
    uri: '/api/1/actioninstance',
    method: "POST",
    form: params
  }, function( error, response, body ) {} );
}

var connectedDevices = { };

var TheAppModule =  module.exports = {

settings: {},

logic: function () {

    
    // Example: pubsub observer for monitoring device online state
    
    pubsub.on( 'online', function( contextValue, deviceIdentity ) {

      if ( contextValue == true )
      {
        connectedDevices[deviceIdentity] = 1;
      }

    } );
    

    Fiber( function() {

      // runs every ten seconds until the app gets stopped
      while ( true )
      {
        console.log( 'bluetooth tick' );
        
        // Iterate through all the devices and update the proximity
        for (var device in connectedDevices)
        {
          console.log( "request proximity on " + device );
          
          executeActionDevice( 'UpdateProximity', [ 'device:' + device ] );
        }
        
        tools.sleep( 12 );

      }

    } ).run();

  }

};

var settings = {};

TheAppModule.logic();