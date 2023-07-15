// filter by type and year change
const slider = d3.select("#slider");
const output = d3.select("body").append("p");
// default init
output.text(1970);
// Update the output value when the slider changes
slider.on("input", function() {
    output.text(this.value);
});
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
let data = [window.headline_cpi[0], window.energy_cpi[0], window.food_cpi[0],
    window.core_cpi[0], window.producer_pi[0]];
// set x and y scale
var x = d3.scaleLinear()
    .domain(cpi_keys)
    .range([0, width]);

svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

var y = d3.scaleLinear()
    .domain([-100,60])  // todo custom
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

// legend info
const legendData = [
    { label: "headline_cpi", color: "steelblue" },
    { label: "energy_cpi", color: "brown" },
    { label: "food_cpi", color: "purple" },
    { label: "core_cpi", color: "orange" },
    { label: "producer_pi", color: "darkgreen" }
];

const legendItems = svg.selectAll(".legend-item")
    .data(legendData)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(${margin.left}, ${margin.top + i * 20})`);

// Draw color dots
legendItems.append("circle")
    .attr("cx", 8)
    .attr("cy", 8)
    .attr("r", 8)
    .attr("fill", d => d.color);

// Add labels
legendItems.append("text")
    .attr("x", 20)
    .attr("y", 12)
    .text(d => d.label)
    .attr("font-size", "12px")
    .style("font-family", "Andale Mono")
    .attr("alignment-baseline", "middle");

// scale for the bars
const xScale = d3.scaleBand()
    .domain(window.headline_cpi.map(d => d.x))
    .range([0, width - margin.right])
    .padding(0.1);


const axisLabelsText =
    svg.selectAll(".axis-label")
    .data(cpi_keys)
    .enter()
    .append("text")
    .attr("class", "axis-label")
    .attr("x", (d,i) => i * 200 + 100)
    .attr("y", height + 10)
    .attr("text-anchor", "start") // Center the text on the tick position
    .text(d => d)
    .style("font-size", "12px");

// preview before select dropdown
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
    .attr("x", (d,i) => i * 200 + 100)
    .attr("width", xScale.bandwidth() * 5)
    .transition()
    .duration(1500)
    .attr("height", d => Math.abs(y(d.y) - y(0)))
    .attr("fill", "steelblue");


// This allows to find the closest X index of the mouse:
var bisect = d3.bisector(function(d) { return d.x; }).left;

function updatePer(year_start, year_end) {
//     todo
    headline_endValue = window.headline_cpi_dict[year_end]
    headline_startValue = window.headline_cpi_dict[year_start]
    const headline_percentageDiff = ((headline_endValue - headline_startValue) / Math.abs(headline_startValue)) * 100;

    // window.energy_cpi_dict?.closestX?.toFixed(2) ?? '-'
    energy_endValue = window.energy_cpi_dict?.year_end ?? 0
    energy_startValue = window.energy_cpi_dict?.year_start ?? 1
    const energy_percentageDiff = energy_endValue !== 0 ? ((energy_endValue - energy_startValue) / Math.abs(energy_startValue)) * 100 : 0;

    food_endValue = window.food_cpi_dict[year_end]
    food_startValue = window.food_cpi_dict[year_start]
    const food_percentageDiff = ((food_endValue - food_startValue) / Math.abs(food_startValue)) * 100;

    core_endValue = window.core_cpi_dict[year_end]
    core_startValue = window.core_cpi_dict[year_start]
    const core_percentageDiff = ((core_endValue - core_startValue) / Math.abs(core_startValue)) * 100;

    producer_endValue = window.producer_pi_dict[year_end]
    producer_startValue = window.producer_pi_dict[year_start]
    const producer_percentageDiff = ((producer_endValue - producer_startValue) / Math.abs(producer_startValue)) * 100;

    data = [headline_percentageDiff, energy_percentageDiff, food_percentageDiff,
        core_percentageDiff, producer_percentageDiff];
    console.log('data: ' + data)

    svg.selectAll("rect").remove();
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", d => (d >= 0) ? y(d) : y(0))
        .attr("x", (d,i) => i * 200 + 100)
        .attr("width", xScale.bandwidth() * 5)
        .transition()
        .duration(1500)
        .attr("height", d => Math.abs(y(d) - y(0)))
        .attr("fill", "steelblue");
}

// What happens when the mouse move -> show the annotations at the right positions.
function mousemove() {
    let data;
    if (selectedOption === "headline_cpi"){
        data = window.headline_cpi;
    } else if (selectedOption === "energy_cpi"){
        data = window.energy_cpi;
    } else if (selectedOption === "food_cpi"){
        data = window.food_cpi;
    } else if (selectedOption === "core_cpi"){
        data = window.core_cpi;
    } else if (selectedOption === "producer_pi"){
        data = window.producer_pi;
    }
    // recover coordinate we need
    var x0 = x.invert(d3.mouse(this)[0]);
    var i = bisect(data, x0, 1);
    let selectedData = data[i-1];
    focus
        .attr("cx", x(selectedData.x)+12)
        .attr("cy", y(selectedData.y));
    // .attr("cy", selectedData.y > 0 ? y(selectedData.y) + 10 : y(selectedData.y) - 10)
    focusText
        .html("year:" + selectedData.x + "  -  " + "inflation:" + selectedData.y)
        .attr("x", x(selectedData.x)+10)
        .attr("y", y(selectedData.y))
        .style("left", (d3.mouse(this)[0])+90 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", (d3.mouse(this)[1])+100 + "px");
}

let selectedOption;
// dropdown update
d3.select("#slider")
    .on("input", function() {
        selectedOption = this.value;
        output.text(this.value);
        console.log("Selected option:", selectedOption);
        updatePer(1970, selectedOption)
        // svg.selectAll(".legend-item").remove();
        // legendItems = svg.selectAll(".legend-item")
        //     .data(legendData)
        //     .enter()
        //     .append("g")
        //     .attr("class", "legend-item")
        //     .attr("transform", (d, i) => `translate(${margin.left}, ${margin.top})`);
        // legendItems.append("circle")
        //     .attr("cx", 8)
        //     .attr("cy", 8)
        //     .attr("r", 8)
        //     .attr("fill", d => d.color)
        //     .style("display", d => (d.label === selectedOption) ? "inherit" : "none");
        // legendItems.append("text")
        //     .attr("x", 20)
        //     .attr("y", 12)
        //     .text(d => d.label)
        //     .attr("font-size", "12px")
        //     .style("font-family", "Andale Mono")
        //     .attr("alignment-baseline", "middle")
        //     .style("display", d => (d.label === selectedOption) ? "inherit" : "none");
        //
        // svg.selectAll("rect").remove();
        // if(selectedOption === 'energy_cpi'){
        //     // Draw the bars
        //     svg.selectAll("rect")
        //         .data(window.energy_cpi)
        //         .enter()
        //         .append("rect")
        //         .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
        //         .attr("x", d => xScale(d.x))
        //         .attr("width", xScale.bandwidth())
        //         .transition()
        //         .duration(1500)
        //         .attr("height", d => Math.abs(y(d.y) - y(0)))
        //         .attr("fill", "brown");
        // } else if (selectedOption === 'headline_cpi') {
        //     // svg.selectAll("rect").remove();
        //     svg.selectAll("rect")
        //         .data(window.headline_cpi)
        //         .enter()
        //         .append("rect")
        //         .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
        //         .attr("x", d => xScale(d.x))
        //         .attr("width", xScale.bandwidth())
        //         .transition()
        //         .duration(1500)
        //         .attr("height", d => Math.abs(y(d.y) - y(0)))
        //         .attr("fill", "steelblue");
        // } else if (selectedOption === 'core_cpi') {
        //     // svg.selectAll("rect").remove();
        //     svg.selectAll("rect")
        //         .data(window.core_cpi)
        //         .enter()
        //         .append("rect")
        //         .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
        //         .attr("x", d => xScale(d.x))
        //         .attr("width", xScale.bandwidth())
        //         .transition()
        //         .duration(1500)
        //         .attr("height", d => Math.abs(y(d.y) - y(0)))
        //         .attr("fill", "orange");
        // } else if (selectedOption === 'food_cpi') {
        //     // svg.selectAll("rect").remove();
        //     svg.selectAll("rect")
        //         .data(window.food_cpi)
        //         .enter()
        //         .append("rect")
        //         .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
        //         .attr("x", d => xScale(d.x))
        //         .attr("width", xScale.bandwidth())
        //         .transition()
        //         .duration(1500)
        //         .attr("height", d => Math.abs(y(d.y) - y(0)))
        //         .attr("fill", "purple");
        // } else if (selectedOption === 'producer_pi') {
        //     // svg.selectAll("rect").remove();
        //     svg.selectAll("rect")
        //         .data(window.producer_pi)
        //         .enter()
        //         .append("rect")
        //         .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
        //         .attr("x", d => xScale(d.x))
        //         .attr("width", xScale.bandwidth())
        //         .transition()
        //         .duration(1500)
        //         .attr("height", d => Math.abs(y(d.y) - y(0)))
        //         .attr("fill", "darkgreen");
        // }

    });