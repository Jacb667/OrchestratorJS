var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );

var sendedMap = { };  // List of devices I have sent a notification.
var phoneMap = { };  // Map of devices and their phone numbers.
var contactList = { };  // Contact list of each device.

var TheAppModule =  module.exports = {

settings: {},

logic: function ()
  {
    // This will be executed each time a device is connected.
    pubsub.on( 'online', function( contextValue, deviceIdentity ) {
      
      if ( contextValue == true )
      {
        console.log( 'Connected device: ' + deviceIdentity );
        
        // Check if this device has his phone number saved in our platform.
        var request = require("request")
        var url = "http://192.168.1.180:9000/api/1/devices"

        request({
          url: url,
          json: true
          }, function (error, response, body) {

            if (!error && response.statusCode === 200)
            {
              for (var i = 0; i < body.devices.length; i++)
              {
                // This device
                if (body.devices[i]["identity"] == deviceIdentity)
                {
                  phoneMap[deviceIdentity] = body.devices[i]["metadata"]["phoneNumber"];
                  console.log(deviceIdentity + " found phoneNumber " + phoneMap[deviceIdentity]);
                }
              }
            }
            
            // Request the phone number to the device if we don't have it
            if (phoneMap[deviceIdentity] == undefined || phoneMap[deviceIdentity] == null || phoneMap[deviceIdentity] == "")
            {
              var paramsPhoneDialog = {
                actionName: 'PhoneDialog',
                parameters: [ 'device:' + deviceIdentity ]
              };

              httprequest( {
                uri: '/api/1/actioninstance',
                method: "POST",
                form: paramsPhoneDialog
              }, function( error, response, body ) {} );
            }
        });
      
        // Request the contact list to the device
        var paramsContactList = {
          actionName: 'GetContactList',
          parameters: [ 'device:' + deviceIdentity ]
        };

        httprequest( {
          uri: '/api/1/actioninstance',
          method: "POST",
          form: paramsContactList
        }, function( error, response, body ) {} );
      }
      else  // The device it's disconnected from the platform
      {
        // Delete the phone from the map and all its data
        delete phoneMap[deviceIdentity];
        delete sendedMap[deviceIdentity];
        delete contactList[deviceIdentity];
      }

    } );
    
    // Devices without a valid phone number cannot participate in this app
    pubsub.on( 'phoneNumber', function( contextValue, deviceIdentity ) {
      
      console.log(deviceIdentity + ": " + contextValue);
      phoneMap[deviceIdentity] = contextValue;
      
    } );
    
    // Request data from proximity
    pubsub.on( 'proximityDevices', function ( contextValue, deviceIdentity ) {
      
      console.log("Proximity: " + deviceIdentity + " - " + contextValue);
      console.log("JSON: " + JSON.stringify(contextValue));
      
      for(var i = 0; i < contextValue.length;i++)
      {
        var device = contextValue[i][0];
        console.log( "Iterando device " + device );

        var phoneNum = phoneMap[deviceIdentity];
        console.log( "phoneNum " + phoneNum );
        
        // Check if the user has me in his contact list.
        if (contactList[device] != null)
        {
          for(var p = 0; p < contactList[device].length; p++)
          {
            // I have already sent a notification to this device. Don't spam it.
            if (sendedMap[device] == deviceIdentity)
            {
              continue;
            }
            
            if (phoneNum == contactList[device][p])
            {
              sendedMap[device] = deviceIdentity;
              
              // Send notification!
              var params = {
              actionName: 'SendNotification',
              parameters: [ 'device:' + device, 'Contact available', deviceIdentity + ' is available in your proximity.', 15 ]
              };

              httprequest( {
                uri: '/api/1/actioninstance',
                method: "POST",
                form: params
              }, function( error, response, body ) {} );
            }
          }
        }
      }
        
    } );
    
    // Request data from contact list
    pubsub.on( 'contactList', function ( contextValue, deviceIdentity ) {
      
      console.log("Contact List: " + deviceIdentity + " - " + contextValue);
      
      contactList[deviceIdentity] = contextValue;
      
    } );
    

    // Debug tick which prints everything to the console.
    Fiber( function() {

      // runs every ten seconds until the app gets stopped
      while ( true )
      {
        console.log( 'debug tick' );
        
        console.log( "sendedMap: " + JSON.stringify(sendedMap) );
        console.log( "phoneMap: " + JSON.stringify(phoneMap) );
        console.log( "contactList: " + JSON.stringify(contactList) );
        
        tools.sleep( 10 );

      }

    } ).run();
    
    
    // Update Bluetooth visibility of all connected devices
    Fiber( function() {

      while ( true )
      {
        console.log( 'bluetooth tick' );
        
        // Iterate through all the devices and update the proximity.
        Object.keys(phoneMap).forEach(function(key) {
          
          console.log( "request proximity on " + key );
          
          var params = {
            actionName: 'UpdateProximity',
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