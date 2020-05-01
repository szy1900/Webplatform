const  update_market_count = (market_name)=>
{
    if (market_name === 'All_market')
    {
        var query = "SELECT * FROM great_ocean_road" ;
    }
    else
    {
        var query = "SELECT * FROM great_ocean_road where market = '" + market_name + "'";
    }
    // console.log(query)
    var param = $.param({
          q: query,
          // format: "GeoJSON"
        });
    var url = "https://szy0414.cartodb.com/api/v2/sql?" + param;
    $.getJSON(url).done(function(data){
        console.log(data)
        total_number =    data.rows.length
        $('#summaryCount').text(total_number)
        $('.Total_number').text(' out of '+ total_accomadation+ ' listings '+ '('+(total_number/total_accomadation*100).toFixed(1)+'%'+')')

        Entire_home = data.rows.filter(function(element){ return element.room_type === 'Entire home/apt' })
        Entire_home_count = Entire_home.length
        Private_home = data.rows.filter(function(element){ return element.room_type === 'Private room' })
        Private_home_count=Private_home.length
        Shared_room = data.rows.filter(function(element){ return element.room_type === 'Shared room' })
        Shared_room_count = Shared_room.length
        $('#summaryEntireHomePercentage').text((Entire_home_count/total_number*100).toFixed(1))
        my_prices = data.rows.map((d)=>d.price)
        mean_price = my_prices.reduce((acc,current)=>acc+current,0)/total_number
        $('#summaryPrice').text(mean_price.toFixed(1))
        console.log(mean_price)
        $('#summaryEntireHomeMetricsNumber').text(Entire_home_count)
        $('#summaryEntireHomeMetricsPercentage').text((Entire_home_count/total_number*100).toFixed(1))
        $('#summaryPrivateRoomMetricsNumber').text(Private_home_count)
        $('#summaryPrivateRoomMetricsPercentage').text((Private_home_count/total_number*100).toFixed(1))
        $('#summarySharedRoomMetricsNumber').text(Shared_room_count)
        $('#summarySharedRoomMetricsPercentage').text((Shared_room_count/total_number*100).toFixed(1))


})}



function update_bar(my_text)
{
   var file_name = 'dataset/' + my_text + '.csv'
    file_name= file_name.split(' ').join('_');
    console.log(file_name)
     d3.csv(file_name).then(data => {
       filtered_accomadation = data.filter((d)=>{
          return d.room_type !=='Hotel room'
       })
      filtered_accomadation.forEach(d => {
        d.mean= +d.mean;
        d.count=+d.count
      });
      render(filtered_accomadation);
      // return filtered_accomadation
   });
   // return my_value;
}
const  Initialize_bar_and_map=(my_text)=>
{
    update_bar(my_text)

    // plotData2Map("SELECT * FROM great_ocean_road")
    airbnbGeoJson = L.geoJSON(property_samples, {

		style: function (feature) {
			 switch (feature.properties.room_type) {
				case 'Entire home/apt': return {fillColor: "#f03",
					color:null
				};
				case 'Private room':   return {fillColor: "#3FB211",
				color: null};
				default: return {fillColor: "#FFFF",
				color: null,
				fillOpacity: 0
				};
        }
		},
		// onEachFeature: onEachFeature,
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
				radius: 2,
				fillOpacity: 0.5,
			});
		}
	}).addTo(mymap);
}
function plotData2Map(query) {
    var param = $.param({
      q: query,
      format: "GeoJSON"
    });
    var url = "https://szy0414.cartodb.com/api/v2/sql?" + param;
    // console.log(url);
    mymap.fire('dataloading');
    $.getJSON(url).done(function(data){
      // Clean the layer
      mymap.removeLayer(airbnbGeoJson);
      var airbnbData = data;
      airbnbGeoJson = L.geoJson(airbnbData, {
        style: function (feature) {
             switch (feature.properties.room_type) {
                case 'Entire home/apt': return {fillColor: "#f03",
                    color:null
                };
                case 'Private room':   return {fillColor: "#3FB211",
                color: null};
                default: return {fillColor: "#FFFF",
                color: null,
                fillOpacity: 0
                };}},
        // onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 2,
                fillOpacity: 0.5,
            });
        }
      }).addTo(mymap);
      // map.fitBounds(airbnbGeoJson.getBounds());
      mymap.fire('dataload');
    });
  }