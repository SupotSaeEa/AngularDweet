angular.module('app', []);
angular.module('app').controller('dweetCtrl', function($scope){
	$scope.dweetServer = "https://dweet.io";
	$scope.messages = "Messages";

	var dweetServer = "https://dweet.io";
	dweetio.set_server(dweetServer, false);

	var testData = {
		hello:"world",
		random:Math.floor((Math.random() * 50000) + 1)
	};

	dweetio.dweet({some:"data"}, function(err, dweet){
		console.log(dweet.thing);
		console.log(dweet.content);
		console.log(dweet.created);
	});

	dweetio.get_latest_dweet_for("Node-RED-Supotsaeea", function(err, dweet){

	    var dweet = dweet[0]; // Dweet is always an array of 1

	    console.log(dweet.thing); // The generated name
	    console.log(dweet.content); // The content of the dweet
	    console.log(dweet.created); // The create date of the dweet
	    var str = JSON.stringify(dweet.content).replace("{","").replace("}","");
	    $scope.humidity = str.split(",")[0].split(":")[1]; 
	    $scope.temperature = str.split(",")[1].split(":")[1]; 
	    $scope.$apply();
	});

	dweetio.listen_for("Node-RED-Supotsaeea", function(dweet){

	    //var dweet = dweet[0]; // Dweet is always an array of 1

	    console.log(dweet.thing); // The generated name
	    console.log(dweet.content); // The content of the dweet
	    console.log(dweet.created); // The create date of the dweet

	    //var str = JSON.stringify(dweet.content).replace("{","").replace("}","");
	    //$scope.humidity = str.split(",")[0].split(":")[1]; 
	    $scope.humidity = dweet.content.humidity;
	    $scope.g1.refresh($scope.humidity);
	    //$scope.temperature = str.split(",")[1].split(":")[1]; 
	    $scope.temperature = dweet.content.temperature;
	    $scope.g2.refresh($scope.temperature);
	    
	    $scope.$apply();
	});

	$scope.g1 = new JustGage({
		id: "g1",
		value: getRandomInt(0, 100),
		min: 0,
		max: 100,
		title: "Humidity",
		label: "%",		
	});

	$scope.g2 = new JustGage({
		id: "g2",
		value: getRandomInt(0, 100),
		min: 0,
		max: 100,
		title: "Temperature",
		label: "C"
	});
	
	$scope.g1.refresh(25);
	$scope.g2.refresh(45);

});