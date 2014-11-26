var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );

var connectedDevices = { };
var locateDevice = { };

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

var TheAppModule =  module.exports = {

settings: {},

logic: function () {

		// Request the profile to the user
    pubsub.on( 'online', function( contextValue, deviceIdentity ) {

      if ( contextValue == true )
      {
        executeActionDevice( 'RequestLocateProfile', [ 'device:' + deviceIdentity ] );
        locateDevice[deviceIdentity] = [ ];
      }
      else
      {
        delete connectedDevices[deviceIdentity];
        delete locateDevice[deviceIdentity];
      }
      
    } );
    
    pubsub.on( 'locateProfile', function( contextValue, deviceIdentity ) {
      
      connectedDevices[deviceIdentity] = contextValue;
      
      executeActionDevice( 'RequestLocatePerson', [ 'device:' + deviceIdentity, JSON.stringify(connectedDevices) ] );
      
    } );
    
    pubsub.on( 'locatePerson', function( contextValue, deviceIdentity ) {
      
      console.log(deviceIdentity + " wants to locate " + contextValue);
      var found = false;
      for (var device in connectedDevices)
      {
        if (connectedDevices[device]["name"] == contextValue)
        {
          locateDevice[device].push(deviceIdentity);
          found = true;
          
          executeActionDevice ( 'RequestGpsPosition', [ 'device:' + device ] );
          executeActionDevice ( 'SetBluetoothTarget', [ 'device:' + deviceIdentity,
                                                        contextValue, 
                                                        connectedDevices[device]["bmac"],
                                                        connectedDevices[device]["image"] ] );
          break;
        }
      }
      
      if (!found)
      {
        executeActionDevice( 'SendNotification', [ 'device:' + deviceIdentity, 
                                                   "Device not found",
                                                   "There is no device with such name.", 
                                                   "30" ] );
      }
      
    } );
    
    pubsub.on( 'gps_location', function( contextValue, deviceIdentity ) {
      
      // Resend the GPS Position to every device trying to locate us
      for (var i = 0; i < locateDevice[deviceIdentity].length; i++)
      {
        console.log("Sending to " + locateDevice[deviceIdentity][i]);
        executeActionDevice( 'UpdateGPSLocation', [ 'device:' + locateDevice[deviceIdentity][i], 
                                                     connectedDevices[deviceIdentity]["name"], 
                                                     JSON.stringify(contextValue) ]);
      }
      
    } );
    
    Fiber( function() {

      while ( true )
      {
        console.log( 'debug tick' );
        
        //console.log( "connectedDevices: " + JSON.stringify(connectedDevices) );
        console.log( "locateDevice: " + JSON.stringify(locateDevice) );
        
        tools.sleep( 10 );

      }

    } ).run();
      
      
    Fiber( function() {

      // Update the GPS position in every device
      while ( true )
      {
        console.log( 'gps tick' );
        
        // Iterate through all the devices and update the proximity
        for (var device in connectedDevices)
        {
          console.log( "request gps on " + device );
          
          executeActionDevice( 'RequestGpsPosition', [ 'device:' + device ] );
        }
        
        tools.sleep( 30 );

      }

    } ).run();
  }

};

var settings = {};

TheAppModule.logic();