'use strict';
angular.module('validators',[]).constant('MODULE_VERSION','0.0.1')
.value('defaults',{
	email: /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/,
	hour: /^(0[0-9]|1\d|2[0-3]):([0-5]\d)(:([0-5]\d))*$/,
	date: /^\d{4,4}-\d{1,2}-\d{1,2}$/,
	integer: /^\d+$/,
	decimal: /^-?\d+(\.(\d)*)?$/,
	string: /^[a-zA-z]$/,
	fulldate: /^\d{4,4}-\d{1,2}-\d{1,2}\s(0[0-9]|1\d|2[0-3]):([0-5]\d)(:([0-5]\d))*$/,
	errors:[]
})
.directive('emailValidator',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope, elem, attr, ngController)
		{
			function emailValidator(value)
			{
				if(!defaults.email.test(value))
					ngController.$setValidity("ngEmail",false);
				else
					ngController.$setValidity("ngEmail",true);
				return value;
			}
			ngController.$parsers.push(emailValidator);
		}
	};
}])
.directive('ngSmin',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope, elem, attr, ngController)
		{
			function minStringValue(value)
			{
				var minValue = scope.$eval(attr.ngSmin) || 1;
				if(value.length < minValue)
					ngController.$setValidity("ngSmin",false);
				else
					ngController.$setValidity("ngSmin",true);
				return value;
			}
			ngController.$parsers.push(minStringValue);
		}
	};
}])
.directive('ngSmax',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope, elem, attr, ngController)
		{
			function maxStringValue(value)
			{
				var maxValue = scope.$eval(attr.ngSmax) || Infinity;
				if(value.length > maxValue)
					ngController.$setValidity("ngSmax",false);
				else
					ngController.$setValidity("ngSmax",true);
				return value;
			}
			ngController.$parsers.push(maxStringValue);
		}
	};
}])
.directive('ngMin',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope, elem, attr, ngController)
		{
			function minIntegerValue(value)
			{
				var minValue = scope.$eval(attr.ngMin) || 0;
				if(value < minValue)
					ngController.$setValidity("ngMin",false);
				else
					ngController.$setValidity("ngMin",true);
				return value;
				
			}
			ngController.$parsers.push(minIntegerValue);
		}
	};
}])
.directive('ngMax',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope, elem, attr, ngController)
		{
			function maxIntegerValue(value)
			{
				var maxValue = scope.$eval(attr.ngMax) || Infinity;
				if(value > maxValue)
					ngController.$setValidity("ngMax",false);
				else
					ngController.$setValidity("ngMax",true);
				return value;
			}
			ngController.$parsers.push(maxIntegerValue);
		}
	};
}])
.service("validation",function(defaults)
{
	this.printErrors = function(){
		console.log(defaults.errors);
	}
	this.isValid = function(form){
		if(typeof form != "undefined" && typeof form.$valid != "undefined"){
			if(!form.$valid)
				defaults.errors = form.$error;
			return form.$valid;
		}
		else{
			console.log("No es un formulario");
			return false;
		}	
	}
});