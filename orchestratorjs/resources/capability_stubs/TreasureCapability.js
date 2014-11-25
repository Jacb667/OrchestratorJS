module.exports = {

    askLocateTreasure: function(message,jsondata) {
        var methodArguments = ['TreasureCapability', 'askLocateTreasure', [message,jsondata]];
        return this.device.invoke(methodArguments);
    },
    setTargetBluetooth: function(name,bmac) {
        var methodArguments = ['TreasureCapability', 'setTargetBluetooth', [name,bmac]];
        return this.device.invoke(methodArguments);
    },
    showScoreList: function( title,message,jsondata ) {
        var methodArguments = ['TreasureCapability', 'showScoreList', [ title,message,jsondata ]];
        return this.device.invoke(methodArguments);
    },
};