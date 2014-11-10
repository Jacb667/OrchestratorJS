module.exports = {

  body: function ( dev, name, address, phone, email, description, image ) 
  {
    
    console.log("llamada a la action " + name);
    dev.visitingCardCapability.showVisitingCard(name,
                                                address,
                                                phone,
                                                email,
                                                description,
                                                image);
  }

};