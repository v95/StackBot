
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
		this._isEnabled = false;
	};
	
	var _botOn = function(){
		this._isEnabled = true;
	};

	var test = function(){
		if(this._isEnabled){
		    alert("hopefully i blocked the command...");
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