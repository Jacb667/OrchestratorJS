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
  "bt_devices": [
    [ "00:09:88:9a:cf:2e", -30 ],
    [ "d0:e7:82:36:cf:8e", -7 ],
    [ "00:25:56:D0:04:DB", -83 ],
    [ "D0:E7:82:08:66:06", -41 ],
    [ "08:ED:B9:BA:00:F2", -89 ]
  ]
} );


values.push( {
  "bt_devices": [
    [ "00:09:88:9a:cf:2e", -20 ],
    [ "d0:e7:82:36:cf:8e", -12 ],
    [ "D0:E7:82:08:66:06", -41 ],
    [ "08:ED:B9:BA:00:F2", -89 ]
  ]
} );


values.push( {
  "bt_devices": [
    [ "00:09:88:9a:cf:2e", -10 ],
    [ "d0:e7:82:36:cf:8e", -18 ],
    [ "00:25:56:D0:04:DB", -83 ],
    [ "D0:E7:82:08:66:06", -41 ],
    [ "08:ED:B9:BA:00:F2", -89 ]
  ]
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
