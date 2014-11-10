var hostname = 'localhost';
//var hostname = 'orchestratorjs.org';

var pubsub = require( 'socket.io-client' ).connect( 'http://'+hostname+':9000' );
var Fiber = require( 'fibers' );

function sleep( seconds ) {
  var fiber = Fiber.current;
  setTimeout( function() {
    fiber.run();
  }, seconds * 1000 );
  Fiber.yield();
}

var interval = 3;
var deviceIdentity = 'Jose@Bq';

var values = [];
values.push( {
  "image": null

} );



Fiber( function() {

  sleep( 5 );

  for ( i in values ) {

    console.log( 'tick' );
    console.log( values[ i ] );

    pubsub.emit( "ojs_context_data", "", deviceIdentity, values[ i ] );

    sleep( interval );
  }

} ).run();
