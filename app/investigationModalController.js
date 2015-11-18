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