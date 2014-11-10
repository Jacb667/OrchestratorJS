module.exports = {

    askPhoneNumber: function( message,validTime ) {
        var methodArguments = ['PhoneNumberCapability', 'askPhoneNumber', [ message,validTime ]];
        return this.device.invoke(methodArguments);
    },
    getPhoneNumber: function() {
        var methodArguments = ['PhoneNumberCapability', 'getPhoneNumber', []];
        return this.device.invoke(methodArguments);
    },
};