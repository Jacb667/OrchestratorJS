module.exports = {

    requestLocateProfile: function( message ) {
        var methodArguments = ['LocateCapability', 'requestLocateProfile', [ message ]];
        return this.device.invoke(methodArguments);
    },
    askLocatePerson: function( message,jsondata ) {
        var methodArguments = ['LocateCapability', 'askLocatePerson', [ message,jsondata ]];
        return this.device.invoke(methodArguments);
    },
    updateTargetPosition: function( name,location ) {
        var methodArguments = ['LocateCapability', 'updateTargetPosition', [ name,location ]];
        return this.device.invoke(methodArguments);
    },
    setTargetBluetooth: function( name,bmac,image ) {
        var methodArguments = ['LocateCapability', 'setTargetBluetooth', [ name,bmac,image ]];
        return this.device.invoke(methodArguments);
    },
};