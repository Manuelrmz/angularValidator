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
					ngController.$setValidity(attr.name,false);
				else
					ngController.$setValidity(attr.name,true);
				return value;
			}
			ngController.$parsers.push(emailValidator);
		}
	};
}])
.directive('minValidator',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope, elem, attr, ngController)
		{
			function minValidator(value)
			{
				var minValue = attr.ngMin != undefined ? parseInt(attr.ngMin) : 1;
				if(value.length < minValue)
					ngController.$setValidity(attr.name,false);
				else
					ngController.$setValidity(attr.name,true);
				return value;
			}
			ngController.$parsers.push(minValidator);
		}
	};
}])
.directive('maxValidator',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope, elem, attr, ngController)
		{
			function maxValidator(value)
			{
				var maxValue = attr.ngMax != undefined ? parseInt(attr.ngMax) : Infinity;
				if(value.length <= maxValue)
					ngController.$setValidity(attr.name,false);
				else
					ngController.$setValidity(attr.name,true);
				return value;
			}
			ngController.$parsers.push(maxValidator);
		}
	};
}])
.directive('minmaxValidator',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope, elem, attr, ngController)
		{
			function minmaxValidator(value)
			{
				var minValue = attr.nvMin != undefined ? parseInt(attr.nvMin) : 1;
				var maxValue = attr.ngMax != undefined ? parseInt(attr.ngMax) : Infinity;
				if(value.length < minValue || value.length > maxValue)
					ngController.$setValidity(attr.name,false);
				else
					ngController.$setValidity(attr.name,true);
				return value;
			}
			ngController.$parsers.push(minmaxValidator);
		}
	};
}])
.service("validation",function(defaults)
{
	this.printErrors = function(){
		console.log(defaults.errors);
	}
	this.isValid = function(form){
		if(typeof form != "undefined" && typeof form.$valid != "undefined")
		{
			if(!form.$valid)
				defaults.errors = form.$error;
			return form.$valid;
		}
		else
		{
			console.log("No es un formulario");
			return false;
		}	
	}
});