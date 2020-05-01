var total_accomadation = 0;
$(document).ready(function()
{

    var query = "SELECT count(*) FROM great_ocean_road" ;
    var param = $.param({
          q: query,
          // format: "GeoJSON"
        });
    var url = "https://szy0414.cartodb.com/api/v2/sql?" + param;
    $.getJSON(url).done(function(data){
        total_accomadation =    data.rows[0].count
    })

    update_market_count('All_market')
    Initialize_bar_and_map('All_market')
  // $("button").click(function(){
  //   $("p").text("Hello world!");
  }
  );



