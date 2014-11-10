module.exports = {

    askPhoneNumber: function( message,validTime ) {
        var methodArguments = ['GetPhoneNumber', 'askPhoneNumber', [ message,validTime ]];
        return this.device.invoke(methodArguments);
    },
    getPhoneNumber: function() {
        var methodArguments = ['GetPhoneNumber', 'getPhoneNumber', []];
        return this.device.invoke(methodArguments);
    },
};