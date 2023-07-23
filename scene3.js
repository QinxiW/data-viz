// filter by type and year change
const slider = d3.select("#slider");
const output = d3.select("#value").style("font-family", "Andale Mono");


const slider2 = d3.select("#slider2");
const output2 = d3.select("#value2").style("font-family", "Andale Mono");

// Update the output value when the slider changes
slider.on("input", function() {
    output.text('start year' + this.value);
});

slider2.on("input", function() {
    output2.text(this.value);
});
// filter by inflation category on year row

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 1100 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left+10}, ${margin.top})`);

var cpi_keys=['headline_cpi', 'energy_cpi', 'food_cpi', 'core_cpi', 'producer_pi'];

let selectedStartYear = this.slider.value ? this.slider.value : 1970;
let selectedEndYear = this.slider2.value ? this.slider2.value : 2022;
// default init
output.text('Start Year: ' + selectedStartYear);
output2.text('End Year: ' + selectedEndYear);

// dropdown update
d3.select("#slider")
    .on("input", function() {
        selectedStartYear = this.value;
        output.text('Start Year: ' + this.value);
        console.log("selectedStartYear:", selectedStartYear);
        updatePer(selectedStartYear, selectedEndYear);
    });

d3.select("#slider2")
    .on("input", function() {
        selectedEndYear = this.value;
        output2.text('End Year: '+ this.value);
        console.log("selectedEndYear:", selectedEndYear);
        updatePer(selectedStartYear, selectedEndYear);
    });

let headline_endValue = window.headline_cpi_dict[selectedEndYear]
let headline_startValue = window.headline_cpi_dict[selectedStartYear]
const headline_percentageDiff = ((headline_endValue - headline_startValue) / Math.abs(headline_startValue)) * 100;

// window.energy_cpi_dict?.closestX?.toFixed(2) ?? '-'
let energy_endValue = window.energy_cpi_dict?.selectedEndYear ?? 0
let energy_startValue = window.energy_cpi_dict?.selectedStartYear ?? 1
const energy_percentageDiff = energy_endValue !== 0 ? ((energy_endValue - energy_startValue) / Math.abs(energy_startValue)) * 100 : 0;

let food_endValue = window.food_cpi_dict[selectedEndYear]
let food_startValue = window.food_cpi_dict[selectedStartYear]
const food_percentageDiff = ((food_endValue - food_startValue) / Math.abs(food_startValue)) * 100;

let core_endValue = window.core_cpi_dict[selectedEndYear]
let core_startValue = window.core_cpi_dict[selectedStartYear]
const core_percentageDiff = ((core_endValue - core_startValue) / Math.abs(core_startValue)) * 100;

let producer_endValue = window.producer_pi_dict[selectedEndYear]
let producer_startValue = window.producer_pi_dict[selectedStartYear]
const producer_percentageDiff = ((producer_endValue - producer_startValue) / Math.abs(producer_startValue)) * 100;

let data = [headline_percentageDiff, energy_percentageDiff, food_percentageDiff,
    core_percentageDiff, producer_percentageDiff];
console.log(data);
// let data = [window.headline_cpi[0], window.energy_cpi[0], window.food_cpi[0],
//     window.core_cpi[0], window.producer_pi[0]];
// set x and y scale
var x = d3.scaleLinear()
    .domain(cpi_keys)
    .range([0, width]);
svg.append("g")
    .attr("class", "x-axis")
    .attr("font-size", "12px")
    .style("font-family", "Andale Mono")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));


// X axis
// var x = d3.scaleBand()
//     .range([ 0, width ])
//     .domain(cpi_keys)
//     .padding(0.2);
// svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");


var y = d3.scaleLinear()
    .domain([-300,500])  // todo custom
    .range([ height, 0]);
svg.append("g")
    .attr("font-size", "14px")
    .style("font-family", "Andale Mono")
    .call(d3.axisLeft(y));
// Append the percentage symbol to the y-axis labels
svg.selectAll(".tick text")
    .text(function(d) { return d + "%"; });

// svg.append("text")
//     .attr("transform", "rotate(-90)") // Rotate the text to be vertical
//     .attr("y", 0 - margin.left) // Adjust the vertical position
//     .attr("x", 0 - height / 2) // Adjust the horizontal position
//     .attr("dy", "1em") // Adjust the vertical alignment
//     .style("text-anchor", "middle") // Center the text
//     .text("%"); // Replace with your desired y-axis unit

//Add horizontal gridlines
const yGrid = svg.append("g")
    .attr("class", "grid")
    // .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right).tickFormat(""))
    .attr("stroke", "lightgrey")
    .attr("opacity", 0.15)
;

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
// legendItems.append("circle")
//     .attr("cx", 8)
//     .attr("cy", 8)
//     .attr("r", 8)
//     .attr("fill", d => d.color);

// Add labels
// legendItems.append("text")
//     .attr("x", 20)
//     .attr("y", 12)
//     .text(d => d.label)
//     .attr("font-size", "12px")
//     .style("font-family", "Andale Mono")
//     .attr("alignment-baseline", "middle");

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
    .attr("x", (d,i) => i * 200 + 75)
    .attr("y", height + 20)
    .attr("text-anchor", "start") // Center the text on the tick position
    .text(d => d)
    .style("font-size", "16px")
    .style("font-family", "Andale Mono");


function updatePer(year_start, year_end) {

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
        .attr("x", (d,i) => i * 200 + 75)
        .attr("width", xScale.bandwidth() * 5)
        .transition()
        .duration(800)
        .attr("height", d => Math.abs(y(d) - y(0)))
        .attr("fill", (d,i) => legendData[i].color);

    // Append text labels on top of the bars
    // svg.selectAll(".bar-label")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("class", "bar-label")
    //     .attr("y", d => (d >= 0) ? y(d) : y(0))
    //     .attr("x", (d,i) => i * 200 + 100)
    //     .attr("text-anchor", "middle") // Center the text horizontally
    //     .text(d => d)
    //     .style("font-size", "12px")
    //     .style("fill", "red");

    svg.selectAll("rect").on("mouseover", function (event, d) {
        const tooltip = d3.select("#app")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background-color", "lightyellow")
            .style("padding", "5px")
            .style("border", "1px solid #ccc")
            .style("border-radius", "5px")
            .style("pointer-events", "none") // Prevent the tooltip from blocking mouse events on bars
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY - 50}px`);
        tooltip.html(`Percentage change: ${data[d].toFixed(2)}%, 
            Inflation type: ${cpi_keys[d]}, Year range: ${year_start} - ${year_end}`);
    })
        .on("mouseout", function () {
            d3.selectAll(".tooltip").remove();
        });
}

// What happens when the mouse move -> show the annotations at the right positions.
// function mousemove() {
//     let data;
//     if (selectedOption === "headline_cpi"){
//         data = window.headline_cpi;
//     } else if (selectedOption === "energy_cpi"){
//         data = window.energy_cpi;
//     } else if (selectedOption === "food_cpi"){
//         data = window.food_cpi;
//     } else if (selectedOption === "core_cpi"){
//         data = window.core_cpi;
//     } else if (selectedOption === "producer_pi"){
//         data = window.producer_pi;
//     }
//     // recover coordinate we need
//     var x0 = x.invert(d3.mouse(this)[0]);
//     var i = bisect(data, x0, 1);
//     let selectedData = data[i-1];
//     focus
//         .attr("cx", x(selectedData.x)+12)
//         .attr("cy", y(selectedData.y));
//     // .attr("cy", selectedData.y > 0 ? y(selectedData.y) + 10 : y(selectedData.y) - 10)
//     focusText
//         .html("year:" + selectedData.x + "  -  " + "inflation:" + selectedData.y)
//         .attr("x", x(selectedData.x)+10)
//         .attr("y", y(selectedData.y))
//         .style("left", (d3.mouse(this)[0])+90 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
//         .style("top", (d3.mouse(this)[1])+100 + "px");
// }
// preview before select dropdown
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", d => (d >= 0) ? y(d) : y(0))
    .attr("x", (d,i) => i * 200 + 75)
    .attr("width", xScale.bandwidth() * 5)
    .transition()
    .duration(1500)
    .attr("height", d => Math.abs(y(d) - y(0)))
    .attr("fill", (d,i) => legendData[i].color);
svg.selectAll("rect").on("mouseover", function (event, d) {
    const tooltip = d3.select("#app")
        .append("div")
        .attr("class", "tooltip")
        .attr("x", 1000)
        .style("position", "fixed")
        .style("background-color", "lightyellow")
        .style("padding", "15px")
        .style("border", "1px solid #ccc")
        .style("border-radius", "15px")
        .style("pointer-events", "none") // Prevent the tooltip from blocking mouse events on bars
        .style("left", `${d3.event.pageX}px`)
        .style("top", `${d3.event.pageY - 50}px`);
    tooltip
        .html(`Percentage change: ${data[d].toFixed(2)}%, Inflation type: ${cpi_keys[d]}, Year range: ${selectedStartYear} - ${selectedEndYear}`)
        .style("font-family", "Andale Mono");
})
    .on("mouseout", function () {
        d3.selectAll(".tooltip").remove();
    });

// Append text labels on top of the bars
// svg.selectAll(".bar-label")
//     .data(data)
//     .enter()
//     .append("text")
//     .attr("class", "bar-label")
//     .attr("y", d => (d >= 0) ? y(d) : y(0))
//     .attr("x", (d,i) => i * 200 + 100)
//     .attr("text-anchor", "middle") // Center the text horizontally
//     .text(d => d)
//     .style("font-size", "12px")
//     .style("fill", "red");
