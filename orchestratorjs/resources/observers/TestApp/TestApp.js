var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );



module.exports = {
  
  // Define here settings that the app needs from user
  // ( asked from the user s/he starts the app )
  settings: {  },

  // Define your action triggering logic here
  logic: function()
  {
    pubsub.on( 'online', function( contextValue, deviceIdentity ) {

      // runs every ten seconds until the app gets stopped

        console.log( 'tick' );
      	console.log( deviceIdentity );
        
              var paramsPhoneDialog = {
                actionName: 'ShowVisitingCard',
                parameters: [ 'device:' + deviceIdentity, "holaa", "aass", "asgasg", "asgage", "aaa", "" ]
              };

              httprequest( {
                uri: '/api/1/actioninstance',
                method: "POST",
                form: paramsPhoneDialog
              }, function( error, response, body ) {} );


    } );
    

  }
};



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
