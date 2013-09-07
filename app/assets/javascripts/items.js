$(function(){
  var url = $("a[rel=index]").attr("href");
  
  $(".p-links.navigation").load(url + " #links div", function(){
    $(".p-links.navigation").css('visibility', 'visible');
  });

});
