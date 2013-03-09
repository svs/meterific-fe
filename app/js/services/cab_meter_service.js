service_module.service('cab_meter_service', function($http) {
  var host = meterific.default_host;
  return {
    create_cab_meter: function(new_cab_meter) {
      var config = {
	method: "POST",
        data: new_cab_meter,
        url: host + "/cab_meters",
        withCredentials: true
      };
      return $http(config);
    },
    start_cab_meter: function(id) {
      var config = {
	method: "POST",
	data: { id: id },
        url: host + "/cab_meters/start",
        withCredentials: true
      };
      return $http(config);
    },
    stop_cab_meter: function(id) {
      var config = {
	method: "POST",
	data: { id: id },
        url: host + "/cab_meters/stop",
        withCredentials: true
      };
      return $http(config);
    },
    add_point: function(id, point) {
      var config = {
	method: "POST",
	data: { id: id, point: point },
        url: host + "/cab_meters/mark",
        withCredentials: true
      };
      return $http(config);
    },
    read_cab_meter: function(id) {
      var config = {
	method: "GET",
	params: { id: id },
        url: host + "/cab_meters/read",
        withCredentials: true
      };
      return $http(config);
    }
  };
 });