service_module.service('api_key_service', function($http) {
  var host = meterific.default_host;
  return {
    create_api_key: function() {
      var config = {
	method: "POST",
        url: host + "/api_keys",
        withCredentials: true
      };
      return $http(config);
    }
  };
});