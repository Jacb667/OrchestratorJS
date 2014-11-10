module.exports = {

    showVisitingCard: function(name,address,phone,email,description,image) {
        var methodArguments = ['VisitingCardCapability', 'showVisitingCard', [name,address,phone,email,description,image]];
        return this.device.invoke(methodArguments);
    },
    requestVisitingCard: function() {
        var methodArguments = ['VisitingCardCapability', 'requestVisitingCard', []];
        return this.device.invoke(methodArguments);
    },
};