// overall line graph of 5 inflation group on year

// Define the data for the line graph
const data = [
        ...window.headline_cpi, ...window.energy_cpi, ...window.food_cpi,
        ...window.core_cpi, ...window.producer_pi
];
// console.log(window.headline_cpi);
console.log(data[0]);
//     [
//     {x: 0, y: 5},
//     {x: 1, y: 10},
//     {x: 2, y: 8},
//     {x: 3, y: 15},
//     {x: 4, y: 12},
// ];


// Set the dimensions of the SVG container
const width = 800;
const height = 400;

// Create the SVG container
const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Define the scales for x and y axes
const xScale =
    d3.scaleLinear()
    // .domain([0, d3.max(data, d => d.x)]) // Adjust the domain according to your data
    .domain([1970, 2022])
    .range([0, width]);

const yScale =
    d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)]) // Adjust the domain according to your data
    .range([height, 0]);

// Define the line function
const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

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


// data.forEach((lineData, index) => {
//         svg.append("path")
//             .datum(lineData)
//             .attr("fill", "none")
//             .attr("stroke", "steelblue")
//             .attr("stroke-width", 2)
//             .attr("d", line);
// });