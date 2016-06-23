( function(angular) {
	angular.module('places')
		.controller('searchCtrl', searchCtrl);

	function searchCtrl($scope) {
		$scope.initPlaces = initPlaces;
		$scope.initPlacesAlt = initPlacesAlt;
		$scope.map;
		$scope.service;
		$scope.infoWindow;
		$scope.query = "";
		$scope.currentLoc;
		$scope.searching = false;
		$scope.located;



		// function implementations
		function initPlaces() {
			$scope.searching = true;
			var options = {
				zoom: 12,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			$scope.map = new google.maps.Map(document.getElementById("gmap"), options);

			

			navigator.geolocation.getCurrentPosition(function(position) {
				$scope.currentLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				
				$scope.map.setCenter($scope.currentLoc);
				$scope.located = false;
				
				var request = {
					location: $scope.currentLoc,
					radius: '500',
					openNow: true,
					query: $scope.query
				};

				$scope.infoWindow = new google.maps.InfoWindow();
				$scope.service = new google.maps.places.PlacesService($scope.map);
				$scope.service.textSearch(request, fn);
			});
			

		}

		function initPlacesAlt() {
			$scope.searching = true;
			var options = {
				zoom: 12,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			$scope.map = new google.maps.Map(document.getElementById("gmap"), options);

			$scope.currentLoc = new google.maps.LatLng(-33.8665433, 151.1956316);
				
			$scope.map.setCenter($scope.currentLoc);
			
			var request = {
				location: $scope.currentLoc,
				radius: '500',
				openNow: true,
				query: $scope.query
			};

			$scope.infoWindow = new google.maps.InfoWindow();
			$scope.service = new google.maps.places.PlacesService($scope.map);
			$scope.service.textSearch(request, fn);
		}

		function fn(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				$scope.located = true;
			    for (var i = 0; i < results.length; i++) {
					var place = results[i];
					addMarker(results[i]);
			    }
			}
		}

		function addMarker(place) {
			var marker = new google.maps.Marker({
				map: $scope.map,
				position: place.geometry.location,
				icon: {
					url: 'http://maps.gstatic.com/mapfiles/circle.png',
					anchor: new google.maps.Point(10, 10),
					scaledSize: new google.maps.Size(15, 18)
				}
			});

			google.maps.event.addListener(marker, 'click', function() {
				$scope.service.getDetails(place, function(result, status) {
					if (status !== google.maps.places.PlacesServiceStatus.OK) {
						console.error(status);
						return;
					}
					var contentStr = "<p>" + result.name + "<br />" 
										+ "Rating: " + (result.rating ? result.rating : 'Unavailable')
										+ "<br />" + "Open Now!" 
										+ "<br />" + "Located at: " + result.formatted_address
										+ "<br />" + "More Details: " + "<a href='" + result.url + "' target='_blank'>Google Places Page</a>";
					$scope.infoWindow.setContent(contentStr);
					$scope.infoWindow.open($scope.map, marker);
				});
			});
		}
	}

} )(angular);