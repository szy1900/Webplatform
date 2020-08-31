import {loadAndProcessData} from "./load_and_process_data.js";
loadAndProcessData().then((data)=>
    {
        const svg = d3.select('svg');
        const width = +svg.attr('width');
        const height = +svg.attr('height');

        const margin = {top:80, right:40, bottom:90, left:100};
        const innerWidth = width - margin.left - margin.right;
        const innerHeight= height - margin.top - margin.bottom;
        const title = 'Temp in SF for a week';

        const lineChartG = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
        const colorLegendG = svg.append('g');

        var person = {
          name: "Brendan Eich",
          hello: function(thing) {
            console.log(this.name + " says hello " + thing);
          }
        }

// this:
        person.hello.call(person, "world")
        // lineChartG.call()

        const xValue = d => d.date;
        const yValue = d => d.temperature;
        const xScale = d3.scaleTime()
          .domain( d3.extent(data, xValue ))
          .range([0, innerWidth])
          .nice();

          const yScale = d3.scaleLinear()
          .domain( d3.extent(data, yValue ))
          .range([innerHeight,0])
          .nice();


            const xAxisLabel = 'Date';
            const yAxisLabel = 'Temperature';
            const lineGenerator = d3.line()
            .x(d => xScale(d.date) )
            .y(d =>  yScale(d.temperature) )
            .curve(d3.curveBasis);


        // console.log(lineGenerator(data))


           const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(20);

          const yAxis = d3.axisLeft(yScale)
            .tickSize(20)
            .tickPadding(10);
          const yAxisG = lineChartG.append('g')
            .call(yAxis);
           yAxisG.selectAll('.domain').remove();

          const xAxisG = lineChartG.append('g').call(xAxis)
          .attr('transform', `translate(0, ${innerHeight})`);

        xAxisG.append('text')
                .attr('class','axis-label')
                .attr('y', 70)
                .attr('x',innerWidth/2)
                .attr('fill','black')
                .text(xAxisLabel);

      lineChartG.append('text')
        .attr('class','title')
        .attr('y', -10)
        .text(title)
         lineChartG.append('path')
            .attr('class', 'line-path')
            .attr('d', lineGenerator(data));

    }


)