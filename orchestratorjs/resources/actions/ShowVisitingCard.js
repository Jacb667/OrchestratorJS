module.exports = {

  body: function ( dev, name, address, phone, email, description, image ) 
  {
    
    dev.visitingCardCapability.showVisitingCard(name,
                                                address,
                                                phone,
                                                email,
                                                description,
                                                image);
  }

};