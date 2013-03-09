'use strict';

/* Controllers */

function HomeController($scope, $timeout, api_key_service, cab_meter_service) {
  $scope.api_key = {api_key: ""};
  $scope.steps = [[10,21],["remaining",15]];
  $scope.cab_meter = {
    cab_meter: {
      scheme: {
	kms: $scope.steps,
	wait: {
	  per_minute: 3,
	  wait_speed: 5
	}
      }
    },
    api_key: $scope.api_key.api_key
  };
  var points_index = 0;
  var time = moment();
  var points = [[19.108060000000002, 72.83226],
    [19.107180000000003, 72.83226],
    [19.10717, 72.83291000000001],
    [19.10716, 72.83464000000001],
    [19.10715, 72.83604000000001],
    [19.107180000000003, 72.83687],
    [19.1045, 72.83689000000001],
    [19.10294, 72.8369],
    [19.102800000000002, 72.83699],
    [19.102390000000003, 72.83732],
    [19.101840000000003, 72.83849000000001],
    [19.101480000000002, 72.83939000000001],
    [19.10143, 72.8395],
    [19.10134, 72.8395],
    [19.099400000000003, 72.83955],
    [19.09816, 72.83955],
    [19.09748, 72.83959],
    [19.09477, 72.8396],
    [19.09413, 72.8396],
    [19.09374, 72.83955],
    [19.093310000000002, 72.83944000000001],
    [19.093100000000003, 72.83936],
    [19.09268, 72.83914],
    [19.09234, 72.83896],
    [19.09185, 72.83869],
    [19.09157, 72.83857],
    [19.09129, 72.83847],
    [19.09102, 72.83841000000001],
    [19.09056, 72.83836000000001],
    [19.08969, 72.83831],
    [19.0897, 72.83864000000001],
    [19.08988, 72.83947],
    [19.08999, 72.83988000000001],
    [19.09043, 72.84104],
    [19.090580000000003, 72.84155000000001],
    [19.090580000000003, 72.84171],
    [19.09054, 72.84199000000001],
    [19.09046, 72.84256],
    [19.09042, 72.84306000000001],
    [19.09042, 72.84323],
    [19.090480000000003, 72.84360000000001],
    [19.090600000000002, 72.84373000000001],
    [19.091, 72.84405000000001],
    [19.09139, 72.84443],
    [19.09158, 72.8447],
    [19.09185, 72.84516],
    [19.091890000000003, 72.84526000000001],
    [19.09206, 72.84579000000001],
    [19.09223, 72.84651000000001],
    [19.092290000000002, 72.84701000000001],
    [19.092460000000003, 72.84785000000001],
    [19.09271, 72.84911000000001],
    [19.093, 72.84994],
    [19.09319, 72.85036000000001],
    [19.09333, 72.85061],
    [19.09362, 72.85106],
    [19.094, 72.85148000000001],
    [19.09429, 72.85175000000001],
    [19.094720000000002, 72.85204],
    [19.09496, 72.85219000000001],
    [19.095280000000002, 72.85233000000001],
    [19.09572, 72.8525],
    [19.09561, 72.85272],
    [19.095550000000003, 72.85286],
    [19.09494, 72.85384],
    [19.094730000000002, 72.85422000000001],
    [19.094620000000003, 72.85428],
    [19.094440000000002, 72.85454],
    [19.09441, 72.85455]];

    $scope.create_api_key = function() {
    api_key_service.create_api_key().success(function(data) {
      $scope.api_key = angular.copy(data);
    }).error(function(data) {
      $scope.alerts = alert_service.parse_alerts(data);
    });
  };
  $scope.create_cab_meter = function() {
    $scope.cab_meter.api_key = $scope.api_key.api_key;
    cab_meter_service.create_cab_meter($scope.cab_meter).success(function(data) {
      $scope.cab_meter_result = angular.copy(data);
      $scope.show_cab_meter = true;
    }).error(function(data) {
      $scope.alerts = alert_service.parse_alerts(data);
    });
  };
  $scope.start_cab_meter = function(id) {
    cab_meter_service.start_cab_meter(id).success(function(data) {
      $scope.cab_meter_result2 = angular.copy(data);
      $scope.cab_meter_started = true;
    }).error(function(data) {
      $scope.alerts = alert_service.parse_alerts(data);
    });
  };

  $scope.mark_point = function() {
    cab_meter_service.add_point($scope.cab_meter_result2.write_id, $scope.selected_point).success(function(data) {
      $scope.returned_point = data;
      points_index += 1;
      $scope.mark_points();
    }).error(function(data) {
      $scope.alerts = alert_service.parse_alerts(data);
    });
  };


  $scope.mark_points = function() {
    if (points_index >= points.length) {
      $scope.point_added = true;
      return false;
    } else {
      var p = points[points_index];
      time = time.add('seconds',(Math.random()*15) + 15);
      $scope.selected_point = {lat: p[0], lng: p[1], created_at: time._d.toISOString()};
      $scope.mark_point();
    }
  };

  $scope.stop_meter = function(id) {
    cab_meter_service.stop_cab_meter(id).success(function(data) {
						     $scope.cab_meter_result3 = data;
						     $scope.cab_meter_stopped = true;
						   });
  };
  $scope.read_meter = function(id) {
    cab_meter_service.read_cab_meter(id).success(function(data) {
						     $scope.meter_reading = data;
						     $scope.cab_meter_read = true;
						   });
  };
}