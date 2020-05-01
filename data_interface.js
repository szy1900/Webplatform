
const  update_market_count = (market_name)=>
{
    if (market_name === 'All_market')
    {
        var query = "SELECT count(*) FROM great_ocean_road" ;
    }
    else
    {
        var query = "SELECT count(*) FROM great_ocean_road where market = '" + market_name + "'";
    }
    // console.log(query)

    var param = $.param({
          q: query,
          // format: "GeoJSON"
        });
    var url = "https://szy0414.cartodb.com/api/v2/sql?" + param;
    console.log(url)
    $.getJSON(url).done(function(data){
     total_number =    data.rows[0].count
        $('#summaryCount').text(total_number)
        $('.Total_number').text(' out of '+ total_accomadation+ ' listings '+ '('+(total_number/total_accomadation*100).toFixed(1)+'%'+')')

})}
const  update_mymap=(my_text)=>
{
    // = 'All_market';
    var file_name = 'dataset/' + my_text + '.csv'
   d3.csv(file_name).then(data => {
       filtered_accomadation = data.filter((d)=>{
          return d.room_type !=='Hotel room'
       })
      filtered_accomadation.forEach(d => {
        d.mean= +d.mean;
        d.count=+d.count
      });

      render(filtered_accomadation);
    });
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
	}).addTo(mymap);}
