// filter by inflation category on year row

// Define the data for the line graph
const data = [
    ...window.headline_cpi, ...window.energy_cpi, ...window.food_cpi,
    ...window.core_cpi, ...window.producer_pi
];

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

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
    .domain([1970,2025])
    .range([ 0, width ]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
    .domain([-10,30])
    .range([ height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

const line = d3.line()
    .x(d => x(d.x))
    .y(d => y(d.y));

const xScale = d3.scaleBand()
    .domain(window.headline_cpi.map(d => d.x))
    .range([margin.left, width - margin.right])
    .padding(0.1);
d3.select("#dropdown")
    .on("change", function() {
        const selectedOption = d3.select(this).property("value");
        console.log("Selected option:", selectedOption);

        if(selectedOption === 'energy_cpi'){
            svg.selectAll("rect").remove();
            // Draw the bars
            svg.selectAll("rect")
                .data(window.energy_cpi)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d.x))
                .attr("y", d => y(d.y))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - margin.bottom - y(d.y))
                .attr("fill", "brown");
        } else if (selectedOption === 'headline_cpi') {
            svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.headline_cpi)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d.x))
                .attr("y", d => y(d.y))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - margin.bottom - y(d.y))
                .attr("fill", "steelblue");
        } else if (selectedOption === 'core_cpi') {
            svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.core_cpi)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d.x))
                .attr("y", d => y(d.y))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - margin.bottom - y(d.y))
                .attr("fill", "orange");
        } else if (selectedOption === 'food_cpi') {
            svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.food_cpi)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d.x))
                .attr("y", d => y(d.y))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - margin.bottom - y(d.y))
                .attr("fill", "purple");
        } else if (selectedOption === 'producer_pi') {
            svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.producer_pi)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d.x))
                .attr("y", d => y(d.y))
                .attr("width", xScale.bandwidth())
                .attr("height", d => height - margin.bottom - y(d.y))
                .attr("fill", "darkgreen");
        }
    });