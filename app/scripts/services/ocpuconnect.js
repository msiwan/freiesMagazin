'use strict';
/**
 * @ngdoc service
 * @name freiesMagazinApp.ocpuconnect
 * @description
 * # dbconnect
 * Service in the freiesMagazinApp.
 */
angular.module('freiesMagazinApp')
  .factory('ocpuconnect', [function ($scope, storage) {
    
    function getData(datapoints,callbackSuccess){
        //CORS not necessary due to reverse proxy
        ocpu.seturl("//localhost:8080/ocpu/library/freiesMagazin/R"); 

        ocpu.call("detectnormoutlier", {n: datapoints}, function(session){
       
          session.getObject(function(data){
          //console.log("Array of length " + data.length + ".\nValues: " + data); 
          callbackSuccess.call(data);
      
        });
      })
    }

  return {
    getData: getData
  };
}]);
