angular.module('app',['ui.bootstrap']);
angular
  .module('app')
  .controller('appController',appController);

appController.$inject = ['$http','$uibModal'];

function appController($http,$uibModal) {

  var vm = this;

  vm.selectedTestsIds = ["59f17e8d-5826-4213-8b60-fa55b94fc965"];

  // vm.openModal = function openModal() {
  //   var size = 'lg';
  //   var modalOptions = {};
  //   modalOptions.animation = true;
  //   modalOptions.size = 'lg';
  //   modalOptions.templateUrl  = "investigationsModalContent.html";
  //   modalOptions.controller   = "investigatonModalController";
  //   modalOptions.controllerAs = "modalCtrl";
  //   modalOptions.windowClass = "app-modal-window";
  //   modalOptions.resolve = {
  //     tests : function() { return getInvestigationTests().then(function(response){return response;});},
  //     selectedTestsIds : function () { return vm.selectedTestsIds;}
  //   };
  //   vm.modalInstance = $uibModal.open(modalOptions);

  //   vm.modalInstance.result.then(function(selectedTestsIds) {
  //     console.log('modal closed');
  //     vm.selectedTestsIds = selectedTestsIds;
  //     console.log(vm.selectedTestsIds);
  //   },function() {
  //     console.log('modal dismissed');
  //   });

  // }; //end of openModal

  // function getInvestigationTests() {
  //   return $http.get('investigationTest.json')
  //     .then(function(response) {
  //       console.log(response);
  //       return response;
  //     });
  // }

}


