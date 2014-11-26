var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );

var sendedMap = { };
var connectedDevices = { };

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

settings: {"timeout":"600000"},

logic: function ()
  {
    // This will be executed each time a device is connected.
    pubsub.on( 'online', function( contextValue, deviceIdentity ) {
      
      if ( contextValue == true )
      {
        console.log( 'Connected device: ' + deviceIdentity );
        
        // Request the visiting card to the user
        executeActionDevice( 'RequestVisitingCard', [ 'device:' + deviceIdentity ] );
      }
      else
      {
        // Delete the device from the map
        delete connectedDevices[deviceIdentity];
        delete sendedMap[deviceIdentity];
      }

    } );
    
    // Save the Visiting Card, so we can send it to other devices.
    pubsub.on( 'visitingCard', function( contextValue, deviceIdentity ) {
      
      connectedDevices[deviceIdentity] = contextValue;
      sendedMap[deviceIdentity] = { } ;
      
    } );
    
    // Request data from proximity
    pubsub.on( 'proximityDevices', function ( contextValue, deviceIdentity ) {
      
      if (deviceIdentity in connectedDevices)
      {
        console.log("Proximity: " + deviceIdentity + " - " + contextValue);
        console.log("JSON: " + JSON.stringify(contextValue));

        // My visitingCard to send
        var visitingCard = connectedDevices[deviceIdentity];

        for(var i = 0; i < contextValue.length;i++)
        {
          var device = contextValue[i][0];
          console.log( "Iterating device " + device );

          if (device in connectedDevices)
          {
            console.log("Sended Map" + sendedMap[deviceIdentity]);
            var now = new Date().getTime();
            if (sendedMap[deviceIdentity] != null && 
                sendedMap[deviceIdentity][device] != null && 
                sendedMap[deviceIdentity][device] > now)
            {
              console.log("I have already sent to this device!!");
            }
            else
            {
              console.log("Device " + device + " is connected!");
              // Don't send to this device in at least 10 minutes
              sendedMap[deviceIdentity][device] = new Date().getTime()+settings.timeout;

              var parameters = [ 'device:' + device, visitingCard.name, 
                                 visitingCard.phone, visitingCard.address, 
                                 visitingCard.email, visitingCard.description, 
                                 visitingCard.image ]

              executeActionDevice( 'ShowVisitingCard', parameters );
            }

          }
          else
          {
            console.log("Device is not connected");
          }
        }
      }

    } );
    
    Fiber( function() {

      while ( true )
      {
        console.log( 'debug tick' );
        
        //console.log( "connectedDevices: " + JSON.stringify(connectedDevices) );
        //console.log( "sendedMap: " + JSON.stringify(sendedMap) );
        
        tools.sleep( 10 );

      }

    } ).run();
    
    
    // Update Bluetooth visibility of all connected devices
    Fiber( function() {

      while ( true )
      {
        console.log( 'bluetooth tick' );
        
        // Iterate through all the devices and update the proximity
        for (var device in connectedDevices)
        {
          console.log( "request proximity on " + device );
          
          executeActionDevice( 'UpdateProximity', [ 'device:' + device ] );
        }
        
        tools.sleep( 20 );

      }

    } ).run();
  }

};

var settings = {"timeout":"600000"};

TheAppModule.logic();