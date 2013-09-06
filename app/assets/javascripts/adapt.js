
var mql = window.matchMedia("(min-width: 64em)");
mql.addListener(function(){
  adapt();
});

// TODO: Fix multiple event binding when resizing more than one time during a reload
// TODO: Don't wait for navigation to load, use the h1 link instead
var adapt = function(){
  console.log("Adapt!");
  if (mql.matches) {
    function loadBoard() {
      var url = $("a[rel=board]").attr("href");
      var column = $(".main.category .h-column");

      // Avoid duplication, makes action idempotent
      if($(".extra").length === 0) {
        column.before($("<div class='extra'/>"));
      }

      $(".extra").load(url + " .p-columns");
    }

    loadBoard();

      }
  else {
    $(".extra").empty();
  }
}

$(document).on("onNavigationLoaded", adapt);

var onFormSubmit = function(e){
  e.preventDefault();
  var form = $(e.target).parent("form");

  $.post(form.attr("action"), form.serialize(), function(response){
    //location.reload();
    Turbolinks.visit(document.location.href)
  });
}

$(document).on("click", ".main [data-rel=pull] input[type=submit]", onFormSubmit);
$(document).on("click", ".main .h-column .p-forms [data-rel*=move] input[type=submit]", onFormSubmit);

