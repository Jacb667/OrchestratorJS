module.exports = {

    getGpsPosition: function() {
        var methodArguments = ['GpsCapability', 'getGpsPosition', []];
        return this.device.invoke(methodArguments);
    },
};