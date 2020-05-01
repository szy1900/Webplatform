const render = data => {
    svg.selectAll("*").remove();

  const xValue = d => d.count;
  const yValue = d => d.room_type;

  const margin = {top:20, right:10, bottom:20, left:100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
     .range([0, innerWidth]);

  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);
   // X-Axis
    const xAxis = d3.axisBottom(xScale).ticks(3).tickSize(-innerHeight);

    // Group elements
    const g  = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create y-axis group
   const yAxisG = g.append('g')
      .call(d3.axisLeft(yScale));

    yAxisG
    .selectAll('.domain , .tick line')
    .remove();

    // Create x-axis Group
    const xAxisG = g.append('g')
      .call(xAxis)
    		.attr('transform', `translate(0, ${innerHeight})`);

    	xAxisG
    		.select('.domain')
    		.remove();

  // const g = svg.append('g')
  //   .attr('transform', `translate(${margin.left},${margin.top})`);
  // g.append('g').call(d3.axisLeft(yScale));
  // g.append('g').call(d3.axisBottom(xScale))
  //  .attr('transform', `translate(0,${innerHeight})`);

// var color = d3.scale.ordinal().range(["#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
var colorScale = d3.scaleOrdinal(["#f03","#3FB211","#9467bd"]);

colorScale.domain(data.map(yValue));

 // g.selectAll('rect').data(data)
 //  .enter().append('rect')
 //     .attr('y', d => yScale(yValue(d)))
 //    .attr('width', d => xScale(xValue(d)))
 //    .attr('height',yScale.bandwidth())
 //     .attr('fill',d=>colorScale(yValue(d)));

     g.selectAll('rect').data(data)
  .enter().append('rect')
     .attr('y', function(d){ return yScale(yValue(d))} )
    .attr('width', 0)
    .attr('height',yScale.bandwidth())
     .attr('fill',d=>colorScale(yValue(d)))
     .transition()
  .duration(800)
   // .attr('y', d => yScale(yValue(d)))
  .attr("width", function(d){ return xScale(xValue(d))})
  .delay(function(d,i){ return(i*100)})
     // .merge(g).transition().duration(1000);
    // g.selectAll('rect').transaction().duration(1000).style("fill", d=>colorScale(yValue(d)))
};
// d3.csv('dataset/room_count_price.csv').then(data => {
//
//   data.forEach(d => {
//     d.mean= +d.mean;
//     d.count=+d.count
//   });
//   render(data);
// });