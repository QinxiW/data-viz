// filter by inflation category on year row

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 30},
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

//Dropdown
d3.select("#dropdown")
    .selectAll("option")
    .data(cpi_keys)
    .enter()
    .append("option")
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; })

// set x and y scale
var x = d3.scaleLinear()
    .domain([1970,2025])
    .range([ 0, width ]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format(".0f")));

var y = d3.scaleLinear()
    .domain([-10,30])
    .range([ height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

// create a line func
const line = d3.line()
    .x(d => x(d.x))
    .y(d => y(d.y));

// Calculate y-coordinate for zero line
const zeroY = y(0);

// Append line element for zero line
svg.append("line")
    .attr("x1", 0)
    .attr("y1", zeroY)
    .attr("x2", width)
    .attr("y2", zeroY)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "5,5");

// legend data info
const legendData = [
    { label: "headline_cpi", color: "steelblue" },
    { label: "energy_cpi", color: "brown" },
    { label: "food_cpi", color: "purple" },
    { label: "core_cpi", color: "orange" },
    { label: "producer_pi", color: "darkgreen" }
];

let selectedOption = "headline_cpi";
console.log("Selected option:", selectedOption);
let legendItems = svg.selectAll(".legend-item")
    .data(legendData)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(${margin.left}, ${margin.top})`);

// Draw color dots
legendItems.append("circle")
    .attr("cx", 8)
    .attr("cy", 8)
    .attr("r", 8)
    .attr("fill", d => d.color)
    .style("display", d => (d.label === selectedOption) ? "inherit" : "none");

// Add labels
legendItems.append("text")
    .attr("x", 20)
    .attr("y", 12)
    .text(d => d.label)
    .attr("font-size", "12px")
    .style("font-family", "Andale Mono")
    .attr("alignment-baseline", "middle")
    .style("display", d => (d.label === selectedOption) ? "inherit" : "none");

// scale for the bars
const xScale = d3.scaleBand()
    .domain(window.headline_cpi.map(d => d.x))
    .range([0, width - margin.right])
    .padding(0.1);


// preview before select dropdown
svg.selectAll("rect")
    .data(window.headline_cpi)
    .enter()
    .append("rect")
    .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
    .transition()
    .duration(3500)
    .attr("x", d => xScale(d.x))
    .attr("width", xScale.bandwidth())
    .attr("height", d => Math.abs(y(d.y) - y(0)))
    // .attr("y", d => y(d.y))
    // .attr("width", xScale.bandwidth())
    // .attr("height", d => height - margin.bottom - y(d.y))
    .attr("fill", "steelblue");

d3.select("#dropdown")
    .on("change", function() {
        selectedOption = d3.select(this).property("value");
        console.log("Selected option:", selectedOption);
        svg.selectAll(".legend-item").remove();
        legendItems = svg.selectAll(".legend-item")
            .data(legendData)
            .enter()
            .append("g")
            .attr("class", "legend-item")
            .attr("transform", (d, i) => `translate(${margin.left}, ${margin.top})`);
        legendItems.append("circle")
            .attr("cx", 8)
            .attr("cy", 8)
            .attr("r", 8)
            .attr("fill", d => d.color)
            .style("display", d => (d.label === selectedOption) ? "inherit" : "none");
        legendItems.append("text")
            .attr("x", 20)
            .attr("y", 12)
            .text(d => d.label)
            .attr("font-size", "12px")
            .style("font-family", "Andale Mono")
            .attr("alignment-baseline", "middle")
            .style("display", d => (d.label === selectedOption) ? "inherit" : "none");

        if(selectedOption === 'energy_cpi'){
            svg.selectAll("rect").remove();
            // Draw the bars
            svg.selectAll("rect")
                .data(window.energy_cpi)
                .enter()
                .append("rect")
                .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
                .transition()
                .duration(3500)
                .attr("x", d => xScale(d.x))
                .attr("width", xScale.bandwidth())
                .attr("height", d => Math.abs(y(d.y) - y(0)))
                .attr("fill", "brown");
        } else if (selectedOption === 'headline_cpi') {
            svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.headline_cpi)
                .enter()
                .append("rect")
                .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
                .transition()
                .duration(3500)
                .attr("x", d => xScale(d.x))
                .attr("width", xScale.bandwidth())
                .attr("height", d => Math.abs(y(d.y) - y(0)))
                .attr("fill", "steelblue");
        } else if (selectedOption === 'core_cpi') {
            svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.core_cpi)
                .enter()
                .append("rect")
                .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
                .transition()
                .duration(3500)
                .attr("x", d => xScale(d.x))
                .attr("width", xScale.bandwidth())
                .attr("height", d => Math.abs(y(d.y) - y(0)))
                .attr("fill", "orange");
        } else if (selectedOption === 'food_cpi') {
            svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.food_cpi)
                .enter()
                .append("rect")
                .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
                .transition()
                .duration(3500)
                .attr("x", d => xScale(d.x))
                .attr("width", xScale.bandwidth())
                .attr("height", d => Math.abs(y(d.y) - y(0)))
                .attr("fill", "purple");
        } else if (selectedOption === 'producer_pi') {
            svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.producer_pi)
                .enter()
                .append("rect")
                .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
                .transition()
                .duration(3500)
                .attr("x", d => xScale(d.x))
                .attr("width", xScale.bandwidth())
                .attr("height", d => Math.abs(y(d.y) - y(0)))
                .attr("fill", "darkgreen");
        }
    });