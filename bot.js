// $._data($("#sayit-button").get(0), "events").click[0].handler
var bot = function(){
	
	// the id's of the elements on the page
	var _buttonName = "#sayit-button";
	var _inputName = "#input";
	
	// original function definition
	var _originalDefinition = ra;
	
	// the prefix of the console messages
	var _logPrefix = "BOT ::";
	
	// whether the bot is enabled or not
	var _isEnabled = true;

	// inital configuration for event overriding
	var _init = function(){

		ra = _botOverride;
		
		// just to make sure the bot is loaded. I will get rid of this near the end.
		alert('Test bot loaded');
	};
	
	// so that i can turn the bot off 
	var _botOff = function(){
		_isEnabled = false;
		_status();
	};
	
	// so that i can turn the bot on 
	var _botOn = function(){
		_isEnabled = true;
		_status();
	};

	// 
	var _botOverride = function(){
		if(_isEnabled){
		    alert("Command blocked");
			return;
		}
		_originalDefinition(this);
	}
	
	// print the status to the console
	var _status = function(){
		if(_isEnabled){
			console.log(_logPrefix + " currently active.");
		}
		else{
			console.log(_logPrefix + " currently inactive.");
		}
	}
	
	// return all the methods that we want to expose.
	return {
		init : _init,
		on : _botOn,
		off : _botOff,
		status : _status
	}

}();

// initalise the bot
bot.init();