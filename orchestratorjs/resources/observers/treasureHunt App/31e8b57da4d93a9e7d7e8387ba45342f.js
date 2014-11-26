var httprequest = require( '../../tools.js' ).httprequest;
var pubsub      = require( '../../tools.js' ).pubsub();
var tools       = require( '../../tools.js' );
var Fiber       = require( 'fibers' );

var treasureList = { 'Tesoro Casa':{'location':[47.2224593,8.8289845], 'bmac':'e8:2a:ea:24:71:d7'},
                     'Tesoro arbol':{'location':[47.2524593,8.8189845], 'bmac':'e8:2a:ea:24:71:d7'}, 
                     'Tesoro mercado':{'location':[47.2124593,8.8239845], 'bmac':'e8:2a:ea:24:71:d7'}};
var players = { };
var scores = { };
var foundTreasures = { };

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

logic: function () {

    // Example: pubsub observer for monitoring device online state
    pubsub.on( 'online', function( contextValue, deviceIdentity ) {

      if ( contextValue == true )
      {
        executeActionDevice( 'RequestPlayerProfile', [ 'device:' + deviceIdentity ] );
        if (foundTreasures[deviceIdentity] == null)
        	foundTreasures[deviceIdentity] = [ ];
      }
      else
      {
        delete players[deviceIdentity];
      }
      
    } );
    
    pubsub.on( 'locateProfile', function( contextValue, deviceIdentity ) {
      
      players[deviceIdentity] = contextValue;
      if (scores[deviceIdentity] == null)
      {
      	scores[deviceIdentity] = 0;
      }
      
      executeActionDevice( 'RequestLocateTreasure', [ 'device:' + deviceIdentity, JSON.stringify(treasureList) ] );
      executeActionDevice( 'SendPlayerList', [ 'device:' + deviceIdentity, JSON.stringify(scores) ] );
      
    } );
    
    pubsub.on( 'foundTreasure', function( contextValue, deviceIdentity ) {
      
      if (scores[deviceIdentity] == null)
      {
        scores[deviceIdentity] = 5;
      }
      else
      {
        if (foundTreasures[deviceIdentity].indexOf(contextValue) == -1)
        {
        	scores[deviceIdentity] += 5;
        }
      }

      foundTreasures[deviceIdentity].push(contextValue);
      
      executeActionDevice( 'RequestLocateTreasure', [ 'device:' + deviceIdentity, JSON.stringify(treasureList) ] );
      
      for (var player in players)
      {
        executeActionDevice( 'SendPlayerList', [ 'device:' + deviceIdentity, JSON.stringify(scores) ] );
      }
      
    } );
    
    pubsub.on( 'locateTreasure', function( contextValue, deviceIdentity ) {
      
      console.log(deviceIdentity + " LOCATE TREASURE " + contextValue);

      if (treasureList[contextValue] != null)
      {
        if (foundTreasures[deviceIdentity].indexOf(contextValue) == -1)
        {
          executeActionDevice ( 'SetBluetoothTreasure', [ 'device:' + deviceIdentity,
                                                          contextValue, 
                                                          treasureList[contextValue]["bmac"]] );
        }
        else
        {
          executeActionDevice( 'RequestLocateTreasure', [ 'device:' + deviceIdentity, JSON.stringify(treasureList) ] );
          executeActionDevice( 'SendNotification', [ 'device:' + deviceIdentity, 
                                                   "Already found",
                                                   "You have already found that treasure, choose a new one!", 
                                                   "30" ] );
        }
      }
      else
      {
        executeActionDevice( 'RequestLocateTreasure', [ 'device:' + deviceIdentity, JSON.stringify(treasureList) ] );
        executeActionDevice( 'SendNotification', [ 'device:' + deviceIdentity, 
                                                   "Treasure not found",
                                                   "The treasure cannot be found", 
                                                   "30" ] );
      }
      
    } );
    
    pubsub.on( 'treasureFound', function( contextValue, deviceIdentity ) {
      
      foundTreasures[deviceIdentity].push(contextValue);
      
      executeActionDevice( 'RequestLocateTreasure', [ 'device:' + deviceIdentity, JSON.stringify(treasureList) ] );
      
    } );
    
    Fiber( function() {

      // runs every ten seconds until the app gets stopped
      while ( true )
      {
        console.log( 'debug tick' );
        
        console.log( "players: " + JSON.stringify(players) );
        console.log( "foundTreasures: " + JSON.stringify(foundTreasures) );
        
        tools.sleep( 10 );

      }

    } ).run();
  }

};

var settings = {};

TheAppModule.logic();