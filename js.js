var mymap = L.map('mapid').setView([-38, 141.5],8);
const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic3p5MTkwMCIsImEiOiJjazlqanZoNXQwN2FnM2RxcTQyanR4b2txIn0.wl2vC4Qk_3R5tvEhqMCMpA'
}).addTo(mymap);

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
$('.markets').on('click', 'li', function(event) {
    var my_text = $(this).text();
    if (my_text !== 'Barwon South West (All markets)')
    {
                var query = "SELECT * FROM great_ocean_road WHERE market = '" + my_text + "'";
    }
    else
    {
                var query = "SELECT * FROM great_ocean_road";
                my_text = 'All_market';
    }
    event.preventDefault();
    plotData2Map(query);
    var file_name = 'dataset/' + my_text + '.csv'
    file_name= file_name.split(' ').join('_');
    // console.log(file_name)
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
    update_market_count(my_text)

  });