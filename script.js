
function retrieveWikis(){
  var keyword = document.getElementById("search").value;
  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + keyword + "&callback=?", function(data){
    var html = "";
    var itle = "";
    var summary = "";
    var link = "";
    var linkHeader = "";
    if (data.query.searchinfo.totalhits === 0){
      html += "No wikis found."
    }
    for (var i = 0; i < data.query.search.length; i++){
      title = data.query.search[i].title;
      summary = data.query.search[i].snippet;
      linkHeader = title.replace(/[" "]/g,"_");
      link = "https://en.m.wikipedia.org/wiki/" + linkHeader;
      html += "<br><a href=" + link + " target='_blank'><section class='entry'><h2>" + title + "</h2><br>" + summary + "</section></a>"
    }
    $(".display").html(html);
    //$(".display").html(JSON.stringify(data.query.search[1].title));
  });
}

$(document).ready(function(){
  $("#search").keypress(function(e){
    if (e.keyCode == 13){
      event.preventDefault();
      if (document.getElementById("search").value === ""){
        $(".display").html("<br>Please enter search term.");
      }
      else {
        retrieveWikis();
      }
    }
  })
})
