'use strict';

/**
 * @ngdoc function
 * @name freiesMagazinApp.controller:Chart1Ctrl
 * @description
 * # Chart1Ctrl
 * Controller of the freiesMagazinApp
 */
 
angular.module('freiesMagazinApp')
  .controller('Chart1Ctrl', function ($scope, ocpuconnect) {
  
  	function retrieveData(datapoints){

  		ocpuconnect.getData(datapoints,function(){
			chartConfig(this);	
  		});

  	}

  	function createOBJ4Chart(dataObj){

  		  //console.log("createOBJ4Chart");

        var data = [],
            shapes = ['cross', 'triangle-up', 'triangle-down', 'diamond', 'square'];
           
        var label=['OK','OUTLIER','MED OUTLIER', 'MAX OUTLIER'];

        //R function is having 4 elements, but an error occurs in D3.js
        //Scatter chart error when multiple points have same value
        //data points with double value occur because of the used R function for grouping outlier
        //https://github.com/novus/nvd3/issues/330 --> may a version downgrade fix this issue


        //for (var i = 0; i < dataObj.length; i++) { 

        for (var i = 0; i < 2; i++) {
      
            data.push({
                key: label[i],
                values: []
            });
           
            for (var j = 0; j < dataObj[i].length; j++) {
                data[i].values.push({
                    x: Number(dataObj[i][j][0]),
                    y: Number(dataObj[i][j][1]),
             		size:5,
                    shape: shapes[i]
                });
            }
        }
       
  		return data;
  	}

  	function chartConfig(data){
  		  		 
		$scope.options = {
            chart: {
                type: 'scatterChart',
                height: 300,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: false
                },
                showDistX: true,
                showDistY: true,

                //used for scatter chart, but no correct function for circle size & shape               
                //https://github.com/krispo/angular-nvd3/blob/gh-pages/js/scatterChart.js
				        //Please add following 2 options (sizeDomain & sizeRange)
				        //http://stackoverflow.com/questions/20909793/d3-v3-scatterplot-with-all-circles-the-same-radius
                sizeDomain: [1,10], //any interval
    			      sizeRange: [1,256], //optional

                tooltipContent: function(key) {
                    return '<h3>' + key + '</h3>';
                },
                transitionDuration: 350,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: 30
                }
            }
        };

        $scope.config = {
		    visible: true, // default: true
		    extended: false, // default: false
		    disabled: false, // default: false
		    autorefresh: true, // default: true
		    refreshDataOnly: false // default: false
		};

		var chartdata=createOBJ4Chart(data);

		$scope.$apply(function(){
			  $scope.data = chartdata;
 		});

  	}

  	$scope.getNew=function(){
  		if($scope.ocpuForm.$valid===false || $scope.datapoints < 10){

  			$scope.datapoints=10;
  			retrieveData(10);

  		}else{

  			retrieveData($scope.datapoints);
  		
  		}
  	}

	function init()
	{
		$scope.datapoints=100;
		retrieveData($scope.datapoints);
	}

	init();

  });
