module.exports = {

    getContactList: function() {
        var methodArguments = ['ContactCapability', 'getContactList', []];
        return this.device.invoke(methodArguments);
    },
};