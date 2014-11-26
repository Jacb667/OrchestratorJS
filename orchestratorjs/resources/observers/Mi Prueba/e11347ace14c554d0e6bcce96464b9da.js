var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );

var sendedMap = { };
var phoneMap = { };

var TheAppModule =  module.exports = {

settings: {},

logic: function ()
  {
    // Get the "online" status. This will be executed each time a device is connected.
    pubsub.on( 'online', function( contextValue, deviceIdentity ) {
      
      console.log( 'Conectado device: ' + deviceIdentity );

      if ( contextValue != true )
        return;

      // Request the phone number to the device
      var params = {
        actionName: 'PhoneDialog',
        parameters: [ 'device:' + deviceIdentity ]
      };

      httprequest( {
        uri: '/api/1/actioninstance',
        method: "POST",
        form: params
      }, function( error, response, body ) {} );

    } );
    
    // Devices without a valir phone number cannot participate in this app
    pubsub.on( 'phoneNumber', function( contextValue, deviceIdentity ) {
      
      phoneMap[deviceIdentity] = contextValue;
      
    } );
    
    // Request data from proximity
    pubsub.on( 'proximityDevices', function ( contextValue, deviceIdentity ) {
      
      console.log("Proximity: " + deviceIdentity + " - " + contextValue);
      
      
      
    } );
    

    // Example: periodic loop e.g. for polling a website
    Fiber( function() {

      // runs every ten seconds until the app gets stopped
      while ( true )
      {
        console.log( 'debug tick' );
        
        console.log( "sendedMap: " + sendedMap );
        console.log( "phoneMap" + phoneMap );
        
        /*var request = require("request")
        var url = "http://192.168.1.180:9000/api/1/devices"
        
        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200)
            {
                //console.log(body) // Print the json response
                console.log("Device id = " + body.devices[3]["metadata"]["proximityDevices"])
            }
        })*/

        tools.sleep( 10 );

      }

    } ).run();
    
    
    // Update Bluetooth visibility of all connected devices
    Fiber( function() {

      // runs every ten seconds until the app gets stopped
      while ( true )
      {
        console.log( 'bluetooth tick' );
        
        // Iterate through all the devices and update the proximity
        Object.keys(phoneMap).forEach(function(key) {
          
          console.log( "request proximity on " + key );
          
          var params = {
            actionName: 'PruebaProximity',
            parameters: [ 'device:' + key ]
            };

            httprequest( {
              uri: '/api/1/actioninstance',
              method: "POST",
              form: params
            }, function( error, response, body ) {} );

        });

        tools.sleep( 30 );

      }

    } ).run();
  }

};

var settings = {};

TheAppModule.logic();