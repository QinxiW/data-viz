// overall line graph of 5 inflation group on year

// Define the data for the line graph
const data = [
        ...window.headline_cpi, ...window.energy_cpi, ...window.food_cpi,
        ...window.core_cpi, ...window.producer_pi
];
console.log(data[0]);
//     [{x: 0, y: 5},
//     {x: 1, y: 10},
//     {x: 2, y: 8},
// ];

// Set the dimensions of the SVG container
const margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Create the SVG container
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Define the scales for x and y axes
var x = d3.scaleLinear()
    .domain([1970, 2025])
    .range([ 0, width ]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format(".0f")));

// Add Y axis
var y = d3.scaleLinear()
    .domain([-10,30])
    .range([ height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

// Define the line function
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

// tool tip
// var tooltip = d3.select("body")
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("background-color", "white")
//     .style("border", "solid")
//     .style("border-width", "1px")
//     .style("border-radius", "5px")
//     .style("padding", "10px")
//
//
// // A function that change this tooltip when the user hover a point.
// // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
// var mouseover = function(d) {
//         console.log('hi');
//         tooltip
//             .style("opacity", 1)
// }
//
// var mousemove = function(d) {
//         console.log(d);
//         tooltip
//             .html("The exact value of<br>the inflation for year is: " + d.y + d.x)
//             .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
//             .style("top", (d3.mouse(this)[1]) + "px")
// }

// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
var mouseleave = function(d) {
        // console.log(d);
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
}


// Graph line plot
// Append the line to the SVG container
svg.append("path")
    .datum(window.headline_cpi)
    .transition()
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0)
    .duration(2000)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

svg.append("path")
    .datum(window.energy_cpi)
    .transition()
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0)
    .duration(2000)
    .attr("fill", "none")
    .attr("stroke", "brown")
    .attr("stroke-width", 2)
    .attr("d", line);

svg.append("path")
    .datum(window.food_cpi)
    .transition()
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0)
    .duration(2000)
    .attr("fill", "none")
    .attr("stroke", "purple")
    .attr("stroke-width", 2)
    .attr("d", line);

svg.append("path")
    .datum(window.core_cpi)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .transition()
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0)
    .duration(2000)
    .attr("stroke-width", 2)
    .attr("d", line);

svg.append("path")
    .datum(window.producer_pi)
    .attr("fill", "none")
    .attr("stroke", "darkgreen")
    .transition()
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0)
    .duration(2000)
    .attr("stroke-width", 2)
    .attr("d", line);
    // .on("mouseover", mouseover )
    // .on("mousemove", mousemove )
    // .on("mouseleave", mouseleave );


// shade above and below the zero line
const areaBelow = d3.area()
    .x(d => x(d.x))
    .y0(d => zeroY)
    .y1(height - margin.bottom); // Lower boundary of the area

const areaAbove = d3.area()
    .x(d => x(d.x))
    .y0(d => zeroY)
    .y1(margin.top); // Upper boundary of the area

// Draw the areas
svg.append("path")
    .datum(data)
    .attr("fill", "lightgreen")
    .attr("fill-opacity", 0.1)
    .attr("d", areaAbove);

svg.append("path")
    .datum(data)
    .attr("fill", "lightpink")
    .attr("fill-opacity", 0.1)
    .attr("d", areaBelow);

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


// What happens when the mouse move -> show the annotations at the right positions.
function mouseover() {
        focus.style("opacity", 1)
        focusText.style("opacity",1)
}

function mousemove() {
        // recover coordinate we need
        var x0 = x.invert(d3.mouse(this)[0]);
        var i = bisect(data, x0, 1);
        let selectedData = data[i]
        focus
            .attr("cx", x(selectedData.x))
            .attr("cy", y(selectedData.y))
        focusText
            .html("year:" + selectedData.x + "  -  " + "inflation:" + selectedData.y)
            .attr("x", x(selectedData.x)+15)
            .attr("y", y(selectedData.y))
}
function mouseout() {
        focus.style("opacity", 0)
        focusText.style("opacity", 0)
}