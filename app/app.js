angular.module('app',['ui.bootstrap']);
angular
  .module('app')
  .controller('appController',appController);

appController.$inject = ['$http','$uibModal'];

function appController($http,$uibModal) {
  
  var vm = this;




  //vm.investigationTests = angular.fromJson(vm.investigationTestsResponse.payload.investigationTestDetails);

  // var response = getInvestigationTests();

  vm.openModal = function openModal() {
    var size = 'lg';
    var modalOptions = {};
    modalOptions.animation = true;
    modalOptions.size = 'lg';
    modalOptions.templateUrl  = "investigationsModalContent.html";
    modalOptions.controller   = "investigatonModalController";
    modalOptions.controllerAs = "modalCtrl"
    modalOptions.resolve = {
      items : function() { return getInvestigationTests().then(function(response){return response}); }
    };
    vm.modalInstance = $uibModal.open(modalOptions);

    vm.modalInstance.result.then(function(){
      console.log('modal closed');
    },function(){
      console.log('modal dismissed');
    });
  
  }

  function getInvestigationTests() {
    return $http.get('investigationTest.json')
      .then(function(response) {
        console.log(response);
        return response;
      });
  }

}


angular
  .module('app')
  .controller('investigatonModalController',investigatonModalController);

investigatonModalController.$inject=['$filter','$uibModalInstance','items'];

function investigatonModalController($filter,$uibModalInstance,items) {
  var vm = this;
  
  var testsDetails = items.data.payload.investigationTestDetails;
  vm.investigationTests = {};
  vm.investigationTests['Urine Analysis'] = testsDetails['Urine Analysis'];
  vm.investigationTests['Haemotology'] = testsDetails['Haemotology'];
  vm.investigationTests['Serology'] = testsDetails['Serology'];
  vm.investigationTests['Blood Chemistry'] = testsDetails['Blood Chemistry'];
  vm.investigationTests['Bacteriology'] = testsDetails['Bacteriology'];
  vm.investigationTests['Parasitology'] = testsDetails['Parasitology'];
  vm.investigationTests['Histology and cytology'] = testsDetails['Histology and cytology'];




  vm.ok = function OkClicked () {
    $uibModalInstance.close();
  }

}