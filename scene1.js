// Define the data for the line graph
const data = [
    { x: 0, y: 5 },
    { x: 1, y: 10 },
    { x: 2, y: 8 },
    { x: 3, y: 15 },
    { x: 4, y: 12 },
];

// Set the dimensions of the SVG container
const width = 500;
const height = 300;

// Create the SVG container
const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Define the scales for x and y axes
const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x)]) // Adjust the domain according to your data
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)]) // Adjust the domain according to your data
    .range([height, 0]);

// Define the line function
const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

// Append the line to the SVG container
svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);