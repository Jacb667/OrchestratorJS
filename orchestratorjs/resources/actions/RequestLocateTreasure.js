
module.exports = {

  // the body
  body: function ( dev, treasures ) {
    
    //var treasures = "{'ID001':{'name':'Tesoro Casa', 'location':[47.2224593,8.8289845], 'bmac':'e8:2a:ea:24:71:d7'}}"
    dev.treasureCapability.askLocateTreasure( "Enter the name of the person you are looking.", treasures );

  }

};