
function loadBoard() {
  var url = $("a[rel=board]").attr("href");
  var column = $(".main.column");

  // Avoid duplication, makes action idempotent
  if($(".extra").length === 0) {
    column.before($("<div class='extra'/>"));
  }

  $(".extra").load(url + " .columns");
}

$(document).on("onNavigationLoaded", loadBoard);

$(document).on("click", ".main.column .actions input[type=submit]", function(e){
  e.preventDefault();
  var form = $(e.target).parent("form");

  $.post(form.attr("action"), form.serialize(), function(response){
    Turbolinks.visit(document.location.href)
  });
});

