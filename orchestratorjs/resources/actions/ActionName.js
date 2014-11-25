module.exports = {

    exceptionHandler: function(action, device, exception_value) {
        console.log('error on client-side: ' + device.identity + 
                    ', ' + exception_value);
        action.finishAction();
    },

    // the body
    body: function (device) {
    
    	var misc = require('./misc.js');
    
      while( !device.capabilityName.functionName() ) {
        misc.sleep(1);
      }

      var result = device.capabilityName.functionName();
      console.log('RESULT: ' + result);
        
    }
};
