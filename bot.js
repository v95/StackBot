// $._data($("#sayit-button").get(0), "events").click[0].handler
var bot = function(){
	var _buttonName = "#sayit-button";
	var _logPrefix = "BOT ::";
	var _origialDefinition = $._data($(_buttonName).get(0), "events").click[0].handler;
	var _isEnabled = true;

	var _init = function(){
		$(_buttonName).unbind('click'); 
		$(_buttonName).click(_chatCommand);
		alert('Test bot loaded');
	};
	
	var _botOff = function(){
		_isEnabled = false;
		_status();
	};
	
	var _botOn = function(){
		_isEnabled = true;
		_status();
	};

	var _chatCommand = function(){
		if(_isEnabled){
		    alert("Command blocked");
			return;
		}
		_origialDefinition(this);
	}
	
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
		status : _status,
		chatCommand : _chatCommand
	}

}();

// initalise the bot
bot.init();