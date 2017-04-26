var app = angular.module('index', ['validators']);
app.controller('ctrl1',function($scope)
{
	$scope.names = ["manuel","jose","Pedro","Mario"];
	$scope.addNewName = function(isValid)
	{
		if(isValid)
		{
			$scope.names[$scope.names.length] = $scope.nombre;
			console.log($scope.myform.nombre);
			$scope.nombre = "";
		}
		else
		{
			console.log($scope.myform.$error);
		}
	};
});