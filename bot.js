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
	
	// the command dictionary
	var _commands = {};

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
		$._data($(_inputName).get(0), "events").keydown[1].handler = _keypressSendCommand;
		_status();
	};
	
	// so that i can turn the bot on 
	var _botOn = function(){
		_isEnabled = true;
		$._data($(_inputName).get(0), "events").keydown[1].handler = _keydownChatCommand;
		_status();
	};

	// Fires when the user clicks send
	var _buttonChatCommand = function(){
		if(_isBotCommand && _isEnabled){
			_processCommand($(_inputName).val());
			return;
		}
		_buttonSendCommand(this);
	}
	
	// Fires when the keydown event is fired
	var _keydownChatCommand = function(a){
		if(_isBotCommand && _isEnabled)
		{
			// get the proper keyCode as IE doesn't use a.which 
			var code = (a.which) ? a.which : a.keyCode;
			if(code == 13 && !a.shiftKey)
			{
				_processCommand($(_inputName).val());
				a.preventDefault();
				return;
			}
			_keypressSendCommand(a);
		}
		else{
			_keypressSendCommand(a);
		}
	}
	
	// determine whether or not this is a bot command
	var _isBotCommand = function(){
		return $(_inputName).val().indexOf(_botPrefix) === 0;
	}
	
	// handle the processing of the command
	var _processCommand = function(cmd){
	
		// just echo to the console for now
		console.log(_logPrefix + " processing command '" + cmd + "'");
		
		// initial string split
		var cmdAndArgs = str.split(" ");
		
		// to store the args
		var args = new Array();
		
		// rebuild the args array
		for(var i = 1; i < cmdAndArgs.length; i++){
			args[i - 1] = cmdAndArgs[i];
		}
		
		// execute the commands
		_execCommand(cmdAndArgs[0].substring(_botPrefix.length).toLowerCase(), args);
		
		// clear the command once we are done
		$(_inputName).val("");
	}
	
	var _execCommand = function(cmd, args){
		
		// temp debug
		console.log(_logPrefix + " executing command -> " + cmd);
		for(var i = 0; i < args.length; i++){
			console.log("    arg for command -> " + args[i]);
		}
		// end of temp debug		

		// check to see if the command is in the dictionary
		if(_commands[cmd])
		{
			// execute the command
			_commands[cmd](args);
		}
		
		return;
	}
	
	// to register a command
	var _registerCommand = function(cmds, args, func){
		
		return;
	}
	
	// to unregister a command
	var _unregisterCommand = function(cmd){
	
		return;
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
		exec : _execCommand,
		init : _init,
		isCommand: _isBotCommand,
		on : _botOn,
		off : _botOff,
		processCommand : _processCommand,
		register : _registerCommand,
		status : _status,
		test : _keypressSendCommand,
		unregister : _unregisterCommand
	}

}();

// initalise the bot
bot.init();