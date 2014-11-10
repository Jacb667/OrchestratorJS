module.exports = {

  // the body
  body: function ( dev ) {
    

    //console.log("hola");
    //console.log(dev);
    
    dev.bluetoothCapability.updateProximity( 10 );
    
    
    /*var request = require("request")
    var url = "http://192.168.1.180:9000/api/1/devices"

    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            //console.log(body) // Print the json response
            console.log("Device id = " + body.devices[0]["identity"])
        }
    })*/
    
    
    
    
    /*$( '.non-angular-container' ).html( '' );

		$( '.angular-container' ).show();
    
    $.getJSON( '/api/' + apiVersion + '/devices', function( data )
    {

      $scope.capabilities = data.capabilities;

      var nonSpecialMetadata = [];

      for( i in data.metadataFields )
      {
        if( data.metadataFields[ i ] == 'proximityDevices' ) 
        {
        }
        else
        {
          nonSpecialMetadata.push( data.metadataFields[ i ] );
        }
      }


      $scope.metadataFields = nonSpecialMetadata;
      $scope.devices = data.devices;
      $scope.$apply();*

		} );*/
  
  }
  
};
