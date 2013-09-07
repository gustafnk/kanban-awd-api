
var mql = window.matchMedia("(min-width: 64em)");
mql.addListener(function(){
  adapt();
});

var adapt = function(){
  if (mql.matches) {
    function loadBoard() {
      var url = $("a[rel=board]").attr("href");
      var column = $(".main.category .h-column");

      // Avoid duplication, makes action idempotent
      if($(".extra").length === 0) {
        column.before($("<div class='extra'/>"));
      }

      if ("extra" in localStorage) {
        var cache = localStorage.getItem("extra");
        $(".extra").html($(cache));
      }

      $(".extra").load(url + " .p-columns", function(){
        var cache = $(".extra")[0].innerHTML;
        localStorage.setItem("extra", cache);
      });
    }

    loadBoard();

  }
  else {
    $(".extra").empty();
  }
}

$(function(){
  adapt();
});

var onFormSubmit = function(e){
  e.preventDefault();
  var form = $(e.target).parent("form");

  $.post(form.attr("action"), form.serialize(), function(response){
    //location.reload();
    Turbolinks.visit(document.location.href)
  });
}

$(document).on("click",      ".main [data-rel=pull] input[type=submit]", onFormSubmit);
$(document).on("touchstart", ".main [data-rel=pull] input[type=submit]", onFormSubmit);

$(document).on("click",      ".main .h-column .p-forms [data-rel*=move] input[type=submit]", onFormSubmit);
$(document).on("touchstart", ".main .h-column .p-forms [data-rel*=move] input[type=submit]", onFormSubmit);
