module.exports = {

  // the body
  body: function ( dev ) {
    
    var response = dev.visitingCardCapability.requestVisitingCard();
    console.log("Response = " + response);
  }

};