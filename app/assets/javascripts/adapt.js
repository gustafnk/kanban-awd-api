
var mql = window.matchMedia("(min-width: 1024px)");
mql.addListener(function(){
  adapt();
});

var adapt = function(){

  if (mql.matches) {
    function loadBoard() {
      var url = $("a[rel=board]").attr("href");
      var column = $(".main.column");

      // Avoid duplication, makes action idempotent
      if($(".extra").length === 0) {
        column.before($("<div class='extra'/>"));
      }

      $(".extra").load(url + " .columns");
    }

    loadBoard();

    var onFormSubmit = function(e){
      e.preventDefault();
      var form = $(e.target).parent("form");

      $.post(form.attr("action"), form.serialize(), function(response){
        Turbolinks.visit(document.location.href)
      });

    }

    $(document).on("click", ".main .pull input[type=submit]", onFormSubmit);
    $(document).on("click", ".main.column .actions input[type=submit]", onFormSubmit);
  }
  else {
    $(".extra").empty();
  }
}

$(document).on("onNavigationLoaded", adapt);
