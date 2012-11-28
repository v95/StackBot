// $._data($("#sayit-button").get(0), "events").click[0].handler
var bot = function(){
	
	// the id's of the elements on the page
	var _buttonName = "#sayit-button";
	var _inputName = "#input";
	
	// the prefixs
	var _logPrefix = "BOT ::";
	var _botPrefix = "#";
	
	// the original definitions
	var _buttonSendCommand = $._data($(_buttonName).get(0), "events").click[0].handler;
	var _keypressSendCommand = $._data($(_inputName).get(0), "events").keydown[1].handler;
	
	// whether the bot is enabled or not
	var _isEnabled = true;

	// inital configuration for event overriding
	var _init = function(){

		// re-task the button click event
		$(_buttonName).unbind('click'); 
		$(_buttonName).click(_buttonChatCommand);
		
		// now i have to handle the keydown event
		$._data($(_inputName).get(0), "events").keydown[1].handler = _keydownChatCommand;
		
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
	var _buttonChatCommand = function(){
		if(_isBotCommand && _isEnabled){
		    alert("Command blocked");
			return;
		}
		_buttonSendCommand(this);
	}
	
	// Fires when the keydown event is fired
	var _keydownChatCommand = function(k){
		if(_isBotCommand && _isEnabled)
		{
			if(k == 13 && !k.shiftKey)
			{
				alert("Command blocked");
				return;
			}
		}
		else{
			_keypressSendCommand(this);
		}
	}
	
	var _isBotCommand = function(){
		return $(_inputName).val().indexOf(_botPrefix) === 0;
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