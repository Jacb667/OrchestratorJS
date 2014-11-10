module.exports = {

    askPhoneNumber: function( message,validTime ) {
        var methodArguments = ['PhoneNumber', 'askPhoneNumber', [ message,validTime ]];
        return this.device.invoke(methodArguments);
    },
    getPhoneNumber: function() {
        var methodArguments = ['PhoneNumber', 'getPhoneNumber', []];
        return this.device.invoke(methodArguments);
    },
};