'use strict';

/**
 * @ngdoc function
 * @name signGraphApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the signGraphApp
 */
angular.module('signGraphApp')
  .controller('MainCtrl', function ($scope, $window, chatSocket) {
  	$scope.$on('socket:chat', function(event, data){
  		$window.alert(data);
  	});

    $scope.data = [
      {x: 0, value: 4, otherValue: 14},
	  {x: 1, value: 8, otherValue: 1},
	  {x: 2, value: 15, otherValue: 11},
	  {x: 3, value: 16, otherValue: 147},
	  {x: 4, value: 23, otherValue: 87},
	  {x: 5, value: 42, otherValue: 45}
	];

	
	$scope.options = {
	  lineMode: "cardinal",
	  series: [
	    {
	      y: "value",
	      label: "Stripes",
	      type: "area",
	      striped: true,
	      color: "#1f77b4",
	      axis: "y",
	      thickness: "1px",
	      id: "series_0"
	    },
	    {
	      y: "otherValue",
	      label: "Are",
	      type: "area",
	      striped: true,
	      color: "#ff7f0e",
	      axis: "y",
	      thickness: "1px",
	      id: "series_1"
	    }
	  ],
	  stacks: [],
	  axes: {x: {type: "linear", key: "x"}, y: {type: "linear"}},
	  tension: 0.7,
	  tooltip: {mode: "scrubber"},
	  drawLegend: true,
	  drawDots: true,
	  columnsHGap: 5
	};
	
	$scope.optionsSide = {
	  axes: {x: {type: "Direction", key: "x"}, y: {type: "linear"}},
	  series: [
	    {
	      y: "value",
	      label: "A time series",
	      color: "#9467bd",
	      axis: "y",
	      type: "line",
	      thickness: "1px",
	      id: "series_0"
	    }
	  ],
	  stacks: [],
	  lineMode: "linear",
	  tension: 0.7,
	  drawLegend: true,
	  drawDots: true,
	  columnsHGap: 5
	};

	$scope.letterData = [
	  {label: "One", value: 11, color: "#1f77b4"},
	  {label: "Two", value: 22, color: "#ff7f0e"},
	  {label: "Three", value: 33, color: "#2ca02c"}
	];
	$scope.letterOptions = {thickness: 10};
});
