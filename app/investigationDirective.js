angular
  .module('app')
  .directive('investigationDirective',investigationDirective);

investigationDirective.$inject = ['$http','$uibModal'];

function investigationDirective($http,$uibModal) {

  var controller = ['$scope','$uibModal',function investigationDirectiveController ($scope,$uibModal) {

    function getInvestigationTests() {
      return $http.get('investigationTest.json')
        .then(function(response) {
          console.log(response);
          return response;
        });
    }

    $scope.openModal = function openModal () {
      console.log($scope.selectedTestsIds);
      var size = 'lg';
      var modalOptions = {};
      modalOptions.animation = true;
      modalOptions.size = 'lg';
      modalOptions.templateUrl  = "investigationsModalContent.html";
      modalOptions.controller   = "investigatonModalController";
      modalOptions.controllerAs = "modalCtrl";
      modalOptions.windowClass = "app-modal-window";
      modalOptions.backdrop = 'static';
      modalOptions.resolve = {
        tests : function() { return getInvestigationTests().then(function(response){return response;});},
        selectedTestsIds : function () { return $scope.selectedTestsIds;}
      };

      $scope.modalInstance = $uibModal.open(modalOptions);
      $scope.modalInstance.result.then(function(selectedTestsIds) {
        console.log('modal closed');
        $scope.selectedTestsIds = selectedTestsIds;
        console.log($scope.selectedTestsIds);
      },function() {
        console.log('modal dismissed');
      });
    };
  }];


  return {
    restrict: 'E',
    scope: {
      selectedTestsIds: '='
    },
    controller: controller,
    template: '<button ng-click="openModal()">Open Investigation Dialog</button>'
  };
}


