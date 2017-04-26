var app = angular.module('index', ['validators']);
app.controller('ctrl1',function($scope,validation)
{
	$scope.names = ["manuel","jose","Pedro","Mario"];
	$scope.addNewName = function()
	{
		console.log($scope.nombre);
		if(validation.isValid($scope.nombre))
		{
			$scope.names[$scope.names.length] = $scope.nombre;
			console.log($scope.myform.nombre);
			$scope.nombre = "";
		}
		else
		{
			validation.printErrors()
		}
	};
});