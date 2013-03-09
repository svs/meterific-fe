service_module.service('alert_service', ['alerttype', function(alerttype) {
  return {
    parse_alerts: function(response) {
      var alerts = [];
      if(!angular.isUndefined(response.messages)) {
	var messages = response.messages;
	if(!angular.isUndefined(messages.error)) {
	  for(var index = 0; index < messages.error.length; index++)
	    alerts.push(new ytaxi.alert(messages.error[index], alerttype.error));
	}
	if(!angular.isUndefined(messages.warning)) {
	  for(var index = 0; index < messages.warning.length; index++)
	    alerts.push(new ytaxi.alert(messages.warning[index], alerttype.warning));
	}
	if(!angular.isUndefined(messages.info)) {
	  for(var index = 0; index < messages.info.length; index++)
	    alerts.push(new ytaxi.alert(messages.info[index], alerttype.info));
	}
	if(!angular.isUndefined(messages.success)) {
	  for(var index = 0; index < messages.success.length; index++)
	    alerts.push(new ytaxi.alert(messages.success[index], alerttype.success));
	}
      }
      return alerts;
    }
  };
}]);