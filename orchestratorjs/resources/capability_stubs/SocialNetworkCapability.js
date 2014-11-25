module.exports = {

    requestDetails: function() {
        var methodArguments = ['SocialNetworkCapability', 'requestDetails', []];
        return this.device.invoke(methodArguments);
    },
};