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
    update_bar(my_text);
    // console.log(update_bar(my_text))
    update_market_count(my_text)

  });