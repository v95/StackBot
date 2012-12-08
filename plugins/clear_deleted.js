bot.register("clear,c", function(args){
	$.each($("div.monologue"), function(eleToRemove){
		if($("span.deleted", this).size() == $("div.message", this).size())
		{
			$(this).remove();
		}
		else{
			$.each($("span.deleted", this), function(ele){
				$(this).parent().parent().remove();
			});
		}
	});
});