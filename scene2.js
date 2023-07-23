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
    .attr("x", d => xScale(d.x))
    .attr("width", xScale.bandwidth())
    .transition()
    .duration(1500)
    .attr("height", d => Math.abs(y(d.y) - y(0)))
    // .attr("y", d => y(d.y))
    // .attr("width", xScale.bandwidth())
    // .attr("height", d => height - margin.bottom - y(d.y))
    .attr("fill", "steelblue");


// test curser
// This allows to find the closest X index of the mouse:
var bisect = d3.bisector(function(d) { return d.x; }).left;

// Create the circle that travels along the curve of chart
var focus = svg
    .append('g')
    .append('circle')
    .style("fill", "none")
    .attr("stroke", "black")
    .attr('r', 8.5)
    .style("opacity", 0)

// Create the text that travels along the curve of chart
var focusText = svg
    .append('g')
    .append('text')
    .style("opacity", 0)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle")

svg
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

// todo annotation on drastic changed year %


// What happens when the mouse move -> show the annotations at the right positions.
function mouseover() {
    focus.style("opacity", 1)
    focusText.style("opacity",1)
}

function mousemove() {
    let data;
    let fill;
    console.log('selectedOption in mouse' + selectedOption);
    if (selectedOption === "headline_cpi"){
        data = window.headline_cpi;
        fill = "steelblue";
    } else if (selectedOption === "energy_cpi"){
        data = window.energy_cpi;
        fill = "brown";
    } else if (selectedOption === "food_cpi"){
        data = window.food_cpi;
        fill = "purple";
    } else if (selectedOption === "core_cpi"){
        data = window.core_cpi;
        fill = "orange";
    } else if (selectedOption === "producer_pi"){
        data = window.producer_pi;
        fill = "darkgreen";
    }
    // recover coordinate we need
    var x0 = x.invert(d3.mouse(this)[0]);
    var i = bisect(data, x0, 1);
    let selectedData = data[i-1];
    focus
        .attr("cx", x(selectedData.x)+15)
        .attr("cy", y(selectedData.y)+2)
        .style("fill",  fill)
        .raise();
        // .attr("cy", selectedData.y > 0 ? y(selectedData.y) + 10 : y(selectedData.y) - 10)
    focusText
        .html("year:" + selectedData.x + "  -  " + "inflation:" + selectedData.y)
        .attr("x", x(selectedData.x)+10)
        .attr("y", y(selectedData.y)-20)
        .style("left", (d3.mouse(this)[0])+90 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", (d3.mouse(this)[1])+100 + "px")
        .raise();
}
function mouseout() {
    focus.style("opacity", 0)
    focusText.style("opacity", 0)
}


// dropdown update
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

        svg.selectAll("rect").remove();
        if(selectedOption === 'energy_cpi'){
            // Draw the bars
            svg.selectAll("rect")
                .data(window.energy_cpi)
                .enter()
                .append("rect")
                .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
                .attr("x", d => xScale(d.x))
                .attr("width", xScale.bandwidth())
                .transition()
                .duration(1500)
                .attr("height", d => Math.abs(y(d.y) - y(0)))
                .attr("fill", "brown");
        } else if (selectedOption === 'headline_cpi') {
            // svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.headline_cpi)
                .enter()
                .append("rect")
                .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
                .attr("x", d => xScale(d.x))
                .attr("width", xScale.bandwidth())
                .transition()
                .duration(1500)
                .attr("height", d => Math.abs(y(d.y) - y(0)))
                .attr("fill", "steelblue");
        } else if (selectedOption === 'core_cpi') {
            // svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.core_cpi)
                .enter()
                .append("rect")
                .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
                .attr("x", d => xScale(d.x))
                .attr("width", xScale.bandwidth())
                .transition()
                .duration(1500)
                .attr("height", d => Math.abs(y(d.y) - y(0)))
                .attr("fill", "orange");
        } else if (selectedOption === 'food_cpi') {
            // svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.food_cpi)
                .enter()
                .append("rect")
                .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
                .attr("x", d => xScale(d.x))
                .attr("width", xScale.bandwidth())
                .transition()
                .duration(1500)
                .attr("height", d => Math.abs(y(d.y) - y(0)))
                .attr("fill", "purple");
        } else if (selectedOption === 'producer_pi') {
            // svg.selectAll("rect").remove();
            svg.selectAll("rect")
                .data(window.producer_pi)
                .enter()
                .append("rect")
                .attr("y", d => (d.y >= 0) ? y(d.y) : y(0))
                .attr("x", d => xScale(d.x))
                .attr("width", xScale.bandwidth())
                .transition()
                .duration(1500)
                .attr("height", d => Math.abs(y(d.y) - y(0)))
                .attr("fill", "darkgreen");
        }

        svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout);

    });