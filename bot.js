
var bot = function(){
	var _buttonName = "#sayit-button";
	var _origialDefinition = $._data($(_buttonName).get(0), "events").click[0].handler;
	
	var _isEnabled = true;

	var _init = function(){
		$(_buttonName).unbind('click'); 
		$(_buttonName).click(test);
		alert('Test bot loaded');
	};
	
	var _botOff = function(){
		_isEnabled = false;
	};
	
	var _botOn = function(){
		_isEnabled = true;
	};

	var test = function(){
		alert(_isEnabled);
		if(_isEnabled){
		    alert("Command blocked");
			return;
		}
		_origialDefinition(this);
	}
	
	// return all the methods that we want to expose.
	return {
		init : _init,
		on : _botOn,
		off : _botOff,
		test : test
	}

}();

// initalise the bot
bot.init();