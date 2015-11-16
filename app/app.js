angular.module('app',['ui.bootstrap']);
angular
  .module('app')
  .controller('appController',appController);

appController.$inject = ['$http','$uibModal'];

function appController($http,$uibModal) {

  var vm = this;

  vm.selectedTestsIds = ["59f17e8d-5826-4213-8b60-fa55b94fc965"];

  vm.openModal = function openModal() {
    var size = 'lg';
    var modalOptions = {};
    modalOptions.animation = true;
    modalOptions.size = 'lg';
    modalOptions.templateUrl  = "investigationsModalContent.html";
    modalOptions.controller   = "investigatonModalController";
    modalOptions.controllerAs = "modalCtrl";
    modalOptions.windowClass = "app-modal-window";
    modalOptions.resolve = {
      tests : function() { return getInvestigationTests().then(function(response){return response;});},
      selectedTestsIds : function () { return vm.selectedTestsIds;}
    };
    vm.modalInstance = $uibModal.open(modalOptions);

    vm.modalInstance.result.then(function(selectedTestsIds) {
      console.log('modal closed');
      vm.selectedTestsIds = selectedTestsIds;
      console.log(vm.selectedTestsIds);
    },function() {
      console.log('modal dismissed');
    });

  };

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

investigatonModalController.$inject=['$filter','$uibModalInstance','tests','selectedTestsIds'];

function investigatonModalController($filter,$uibModalInstance,tests,selectedTestsIds) {
  var vm = this;

  vm.selectedTestsIds = selectedTestsIds;

  var testsDetails = angular.fromJson(tests.data.payload.investigationTestDetails);
  vm.investigationTests = {};
  vm.investigationTests['Urine Analysis'] = testsDetails['Urine Analysis'];
  vm.investigationTests['Haemotology'] = testsDetails['Haemotology'];
  vm.investigationTests['Serology'] = testsDetails['Serology'];
  vm.investigationTests['Blood Chemistry'] = testsDetails['Blood Chemistry'];
  vm.investigationTests['Bacteriology'] = testsDetails['Bacteriology'];
  vm.investigationTests['Parasitology'] = testsDetails['Parasitology'];
  vm.investigationTests['Histology and cytology'] = testsDetails['Histology and cytology'];

  vm.toggleSelection = function checkBoxSelection(testId)  {

    var index = vm.selectedTestsIds.indexOf(testId);
    if(index > -1) {
      vm.selectedTestsIds.splice(index,1);
    } else {
      vm.selectedTestsIds.push(testId);
    }
  };


  vm.ok = function OkClicked () {
    $uibModalInstance.close(vm.selectedTestsIds);
  };

}