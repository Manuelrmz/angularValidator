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
.directive('checkEmail',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope, elem, attr, ngController)
		{
			function emailValidator(value)
			{
				ngController.$setValidity("ngEmail",defaults.email.test(value));
				return value;
			}
			ngController.$parsers.push(emailValidator);
		}
	};
}])
.directive('checkHour',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope,elem,attr,ngController)
		{
			function checkHour(value)
			{
				ngController.$setValidity('ngTime',defaults.hour.test(value));
				return value;
			}
			ngController.$parsers.push(checkHour);
		}
	};
}])
.directive('checkDate',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope,elem,attr,ngController)
		{
			function checkDate(value)
			{
				ngController.$setValidity('ngDate',defaults.date.test(value));
				return value;
			}
			ngController.$parsers.push(checkDate);
		}
	};
}])
.directive('checkFulldate',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope,elem,attr,ngController)
		{
			function checkFulldate(value)
			{
				ngController.$setValidity('ngFullDate',defaults.fulldate.test(value));
				return value;
			}
			ngController.$parses.push(checkFulldate)
		}
	};
}])
.directive('checkInteger',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope,elem,attr,ngController)
		{
			function checkInteger(value)
			{
				ngController.$setValidity('ngInteger',defaults.integer.test(value));
				return value;
			}
			ngController.$parsers.push(checkInteger);
		}
	};
}])
.directive('checkDecimal',['defaults',function(defaults)
{
	return{
		require:'ngModel',
		link:function(scope,elem,attr,ngController)
		{
			function checkDecimal(value)
			{
				ngController.$setValidity('ngDecimal',defaults.decimal.test(value));
				return value;
			}
			ngController.$parsers.push(checkDecimal);
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
				ngController.$setValidity("ngSmin",value.length >= minValue);
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
				ngController.$setValidity("ngSmax",value.length <= maxValue);
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
				ngController.$setValidity("ngMin",value >= minValue);
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
				ngController.$setValidity("ngMax",value < maxValue);
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