$(function(){
	console.log("loaded!");
	$(".columns").before($("<div class='extra'><h2>Working</h2></div>"))

	var items = $(".working .item [rel=item]");
	_.each(items, function(item){
		var url = $(item).attr("href");
		$(".extra")
			.append($("<div></div>"))
			.children().last()
			.load(url + " .item");
	});

});