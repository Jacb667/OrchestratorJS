var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );

var deviceHashTags = { };
var contactDetails = { };
var sendedMap = { };

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

logic: function ()
  {
    // Get the "online" status. This will be executed each time a device is connected.
    pubsub.on( 'online', function( contextValue, deviceIdentity ) {
      
      console.log("online " + deviceIdentity);
      
      if ( contextValue == true )
      {
        console.log( 'Connected device: ' + deviceIdentity );
        
        // Ask the hashtags to the user
        executeActionDevice( 'RequestHashTags' , ['device:' + deviceIdentity] );
        
        // Ask the social data to the device
        executeActionDevice( 'RequestSocialData' , ['device:' + deviceIdentity] );
        
        sendedMap[deviceIdentity] = { };

      }
      else
      {
        // Delete all the data from the map
        delete deviceHashTags[deviceIdentity];
        delete sendedMap[deviceIdentity];
        delete contactDetails[deviceIdentity];
      }

    } );
    
    // Observer for hashTags
    pubsub.on( 'hashTags', function( contextValue, deviceIdentity ) {
      
      deviceHashTags[deviceIdentity] = contextValue;
      console.log("hashTags " + deviceHashTags[deviceIdentity]);

    } );
    
    // Observer for socialData
    pubsub.on( 'socialData', function( contextValue, deviceIdentity ) {
      
      contactDetails[deviceIdentity] = contextValue;
      
      console.log("socialData " + contactDetails[deviceIdentity]);
      
    } );
    
    // Request data from proximity
    pubsub.on( 'proximityDevices', function ( contextValue, deviceIdentity ) {
      
      console.log("Proximity: " + deviceIdentity + " - " + contextValue);
      console.log("JSON: " + JSON.stringify(contextValue));
      
      for(var i = 0; i < contextValue.length;i++)
      {
        var device = contextValue[i][0];
        
        if(deviceHashTags[device] == null)
        {
          console.log( "Device " + device + " is not connected.");
          continue;
        }
        
        var now = new Date().getTime();
        if (sendedMap[deviceIdentity] != null && 
            sendedMap[deviceIdentity][device] != null && 
            sendedMap[deviceIdentity][device] > now)
        {
          console.log("I have already sent to this device in the last 10 minutes");
        }
        else
        {
          console.log("Device " + device + " is connected!!");
          sendedMap[deviceIdentity][device] = new Date().getTime()+10*60*1000;
          sendedMap[device][deviceIdentity] = new Date().getTime()+10*60*1000;
          
          var commonHashTags = [ ];
          for(var h = 0; h < deviceHashTags[deviceIdentity].length; h++)
          {
            var hashTag = deviceHashTags[deviceIdentity][h];
            console.log("Compruebo si " + device + " tiene " + hashTag);
            // Match hashtags with the other device
            if (deviceHashTags[device].indexOf(hashTag) != -1)
            {
              commonHashTags.push(hashTag);
            }
          }

          if (commonHashTags.length > 0)
          {
            console.log("Found common hashtags: " + commonHashTags);
            
            executeActionDevice( 'SendRequestInformationDialog', 
                                ['device:' + device, 
                                 'device:' + deviceIdentity, 
                                 commonHashTags,
                                 JSON.stringify(contactDetails[device]),
                                 JSON.stringify(contactDetails[deviceIdentity])
                                ] );
          }
        }
      }
        
    } );
    

    Fiber( function() {

      while ( true )
      {
        console.log( 'debug tick' );
        
        console.log( "deviceHashTags: " + JSON.stringify(deviceHashTags) );
        console.log( "sendedMap: " + JSON.stringify(sendedMap) );
        
        tools.sleep( 10 );

      }

    } ).run();
    
    
    // Update Bluetooth visibility of all connected devices
    Fiber( function() {

      while ( true )
      {
        console.log( 'bluetooth tick' );
        
        // Iterate through all the devices and update the proximity
        for (var device in deviceHashTags)
        {
          console.log( "request proximity on " + device );
          
          executeActionDevice( 'UpdateProximity', [ 'device:' + device ] );
        }
        
        tools.sleep( 20 );

      }

    } ).run();
  }

};

var settings = {};

TheAppModule.logic();