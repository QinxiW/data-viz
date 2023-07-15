// filter by inflation category on year row

// Define the data for the line graph
const data = [
    ...window.headline_cpi, ...window.energy_cpi, ...window.food_cpi,
    ...window.core_cpi, ...window.producer_pi
];

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1400 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var cpi_keys=['headline_cpi', 'energy_cpi', 'food_cpi', 'core_cpi', 'producer_pi'];

var color = d3.scaleOrdinal()
    .domain(cpi_keys)
    .range(d3.schemeCategory10);

//Dropdown
d3.select("#selectButton")
    .selectAll('myOptions')
    .data(cpi_keys)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; })

d3.select("#dropdown")
    .selectAll("option")
    .data(cpi_keys)
    .enter()
    .append("option")
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; })


var x = d3.scaleLinear()
    .domain([1970,2022])
    .range([ 0, width ]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
    .domain([-6,20])
    .range([ height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));


xdomain = [0,1];
xrange = [0,2.380953];
ydomain = [0,1];
yrange = [100,130];
cdomain = [0, 42];
crange = ["blue", "orange"];
xs = d3.scaleLinear().domain(xdomain).range(xrange);
ys = d3.scaleLinear().domain(ydomain).range(yrange);
cs = d3.scaleLinear().domain(cdomain).range(crange);
const xScale = d3.scaleBand().domain([0,1,2,3,4,5]).range([0, 200]);
d3.select("#dropdown")
    .on("change", function() {
        const selectedOption = d3.select(this).property("value");
        console.log("Selected option:", selectedOption);

        if(selectedOption=='energy_cpi'){
            d3.select('svg')
                .append("g")
                .attr("transform", "translate(50,50)")
                .selectAll("rect")
                .data(window.energy_cpi)
                .enter()
                .append("rect")
                .attr("x", (d, i) => i*xScale.bandwidth())
                .attr("y", (d, i) => y[i] )
                .attr("width", xScale.bandwidth())
                .attr("height", (d, i) => i);
        }
    });