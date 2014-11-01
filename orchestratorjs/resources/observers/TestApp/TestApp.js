var httprequest = require( "request" );
var socket = require('socket.io-client').connect('http://192.168.1.180:9002');

socket.on( 'online', function ( contextValue, deviceIdentity ) {
  if ( contextValue != true || deviceIdentity != 'Jose@Bq' )
    return;
  
  var params = {};
  params[ 'actionName' ] = 'MakeCoffee';
  params[ 'parameters' ] = [ 'device:Jose@Bq', 'device:Jose@Bq' ];

  httprequest( {
    uri: 'http://192.168.1.180:9000/api/1/actioninstance',
    method: "POST",
    form: params
  }, function( error, response, body ) {
    console.log( 'body: '+body );
  } );
  
});


socket.on( 'coffeeReady', function ( contextValue, deviceIdentity ) {
  if ( contextValue != true )
    return;
  
  var params = {};
  params[ 'actionName' ] = 'InviteForCoffee';
  params[ 'parameters' ] = [ 'device:Jose@Bq', 'device:Jose@Bq' ];

  httprequest( {
    uri: 'http://192.168.1.180:9000/api/1/actioninstance',
    method: "POST",
    form: params
  }, function( error, response, body ) {
    console.log( 'body: '+body );
  } );
  
});
