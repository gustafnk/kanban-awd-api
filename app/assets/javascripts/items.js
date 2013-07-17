$(function(){
	console.log("loaded!");
	$("[itemscope]").first().prepend($("<div class='extra'></div>"))

	var items = $(".working .item [rel=item]");
	_.each(items, function(item){
		var url = $(item).attr("href");
		$(".extra")
			.append($("<div></div>"))
			.children().last()
			.load(url + " .item");
	});

});