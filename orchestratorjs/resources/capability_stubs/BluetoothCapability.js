module.exports = {

    updateProximity: function( delay ) {
        var methodArguments = ['BluetoothCapability', 'updateProximity', [ delay ]];
        return this.device.invoke(methodArguments);
    },
};