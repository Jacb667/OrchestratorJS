var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );

module.exports = {

  settings: {
    coffeeMachineId: null
  },

  logic: function() {

      Fiber( function() {

        while ( true ) {

          console.log( 'locationObserver - tick' );

          tools.sleep( 10 );

        }

      } ).run();


  }
};