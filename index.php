<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>-->
	<script type="text/javascript" src="js/index.js"></script>
	<script type="text/javascript" src="js/validators.js"></script>
	<title>Pruebas con Angular</title>
</head>
<body ng-app="index">
	<div ng-controller="ctrl1">
		<form name="myform" ng-submit="addNewName()" novalidate>
			Nombre:&nbsp;<input name="nombre" type="text" ng-model="nombre" ng-Smin="2" ng-SMax="10" required></br>
			Apellidos:&nbsp;<input name="apellido" type="text" ng-model="apellido" required ng-Smin="2" ng-SMax="20"></br>
			Email:&nbsp;<input name="email" type="email" ng-model="email" check-email required></br>
			Date:&nbsp;<input name="date" type="date" ng-model="date" check-date required></br>
			<button>Add new Name</button>	
			<ul>
				<li ng-repeat="x in names">
					{{ x}}
				</li>
			</ul>
		</form>
	</div>
	<button>Out</button>
</body>
</html>