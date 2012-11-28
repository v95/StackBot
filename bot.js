
var bot = function(){

/*

		Public Methods

*/


	var _init = function(){
		alert('Test bot loaded');
	};

/*

		Private Methods

*/	
	
	
	// return all the methods that we want to expose.
	return {
		init : _init
	}

}();

// initalise the bot
bot.init();