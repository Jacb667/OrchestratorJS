module.exports = {

    requestHashTags: function() {
        var methodArguments = ['HashTagCapability', 'requestHashTags', []];
        return this.device.invoke(methodArguments);
    },
};