﻿angular
    .module('bit.organization')

    .controller('organizationBillingAdjustStorageController', function ($scope, $state, $uibModalInstance, apiService,
        $analytics, toastr, add) {
        $analytics.eventTrack('organizationBillingAdjustStorageController', { category: 'Modal' });
        $scope.add = add;
        $scope.storageAdjustment = 0;

        $scope.submit = function () {
            var request = {
                storageGbAdjustment: $scope.storageAdjustment
            };

            if (!add) {
                request.storageGbAdjustment *= -1;
            }

            $scope.submitPromise = apiService.organizations.putStorage({ id: $state.params.orgId }, request)
                .$promise.then(function (response) {
                    if (add) {
                        $analytics.eventTrack('Added Organization Storage');
                        toastr.success('You have added ' + $scope.storageAdjustment + ' GB.');
                    }
                    else {
                        $analytics.eventTrack('Removed Organization Storage');
                        toastr.success('You have removed ' + $scope.storageAdjustment + ' GB.');
                    }

                    $uibModalInstance.close();
                });
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
