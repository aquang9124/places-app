( function(angular) {
	angular.module('places')
		.controller('headerCtrl', headerCtrl);

	function headerCtrl($scope) {

		$scope.showLinks = showLinks;
		$scope.scrollToDiv = scrollToDiv;
		$scope.mobileScreen = false;
		$scope.openMenu = false;

		// Function implementations
		function showLinks() {
			if ($scope.mobileScreen === true && $scope.openMenu === true) {
				$scope.mobileScreen = false;
				$scope.openMenu = false;
			} else {
				$scope.openMenu = true;
				$scope.mobileScreen = true;
			}
		}

		function scrollToDiv(divID) {
			console.log(divID);
			$('html, body').animate({
		        scrollTop: $("#" + divID).offset().top
		    }, 1000);
		}
	}

} )(angular);