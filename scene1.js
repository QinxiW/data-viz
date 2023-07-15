// overall line graph of 5 inflation group on year

// Define the data for the line graph
const data = [
        ...window.headline_cpi, ...window.energy_cpi, ...window.food_cpi,
        ...window.core_cpi, ...window.producer_pi
];
console.log(data[0]);
//     [
//     {x: 0, y: 5},
//     {x: 1, y: 10},
//     {x: 2, y: 8},
//     {x: 3, y: 15},
//     {x: 4, y: 12},
// ];


// Set the dimensions of the SVG container
// const width = 800;
// const height = 400;
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Create the SVG container
// const svg = d3.select("body")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);

const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Define the scales for x and y axes
// const xScale =
//     d3.scaleLinear()
//     // .domain([0, d3.max(data, d => d.x)]) // Adjust the domain according to your data
//     .domain([1970, 2025])
//     .range([0, width]);
//
// const yScale =
//     d3.scaleLinear()
//     .domain([-10, d3.max(data, d => d.y)]) // Adjust the domain according to your data
//     .range([height, 0]);

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

// Append the line to the SVG container
svg.append("path")
    .datum(window.headline_cpi)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

svg.append("path")
    .datum(window.energy_cpi)
    .attr("fill", "none")
    .attr("stroke", "brown")
    .attr("stroke-width", 2)
    .attr("d", line);


svg.append("path")
    .datum(window.food_cpi)
    .attr("fill", "none")
    .attr("stroke", "purple")
    .attr("stroke-width", 2)
    .attr("d", line);


svg.append("path")
    .datum(window.core_cpi)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 2)
    .attr("d", line);


svg.append("path")
    .datum(window.producer_pi)
    .attr("fill", "none")
    .attr("stroke", "darkgreen")
    .attr("stroke-width", 2)
    .attr("d", line);

const areaBelow = d3.area()
    .x(d => x(d.x))
    .y0(d => zeroY)
    .y1(height - margin.bottom); // Lower boundary of the area

const areaAbove = d3.area()
    .x(d => x(d.x))
    .y0(d => zeroY)
    .y1(margin.top); // Upper boundary of the area

// // Draw the areas
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
    .attr("r", 6)
    .attr("fill", d => d.color);

// Add labels
legendItems.append("text")
    .attr("x", 20)
    .attr("y", 12)
    .text(d => d.label)
    .attr("font-size", "12px")
    .attr("alignment-baseline", "middle");