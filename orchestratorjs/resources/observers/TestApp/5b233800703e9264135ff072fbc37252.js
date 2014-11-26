var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );



var TheAppModule =  module.exports = {

settings: {},

logic: function ()
  {
    pubsub.on( 'online', function( contextValue, deviceIdentity ) {

      // runs every ten seconds until the app gets stopped
      
      var paramsDialog = {
        actionName: 'DialogTest',
        parameters: [ 'device:' + deviceIdentity ]
      };

      httprequest( {
        uri: '/api/1/actioninstance',
        method: "POST",
        form: paramsDialog
      }, function( error, response, body ) {
      	console.log("RESPONSE " + response);
      } );

        console.log( 'tick' );
      
      	/*console.log( deviceIdentity );
        
              var paramsPhoneDialog = {
                actionName: 'ShowVisitingCard',
                parameters: [ 'device:' + deviceIdentity, "holaa", "aass", "asgasg", "asgage", "aaa", "" ]
              };

              httprequest( {
                uri: '/api/1/actioninstance',
                method: "POST",
                form: paramsPhoneDialog
              }, function( error, response, body ) {} );*/


    } );
    

  }

};

var settings = {};

TheAppModule.logic();