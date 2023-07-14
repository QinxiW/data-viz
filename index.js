var data = [80, 120, 60, 150, 200];
var barHeight = 20;

// d3.select("svg")
//   .selectAll("rect")
//   .data(data)
//   .enter()
//   .append("rect")
//   .attr("width", function(data) {
//     return data;
//   })
//   .attr("height", barHeight - 1)
//   .attr("transform", function(data) {
//     return `translate(0, ${data})`;

//     console.log(data);
//   })
//   .attr("fill", "lightpink")
//   .transition()
//   .duration(7000);

// const svg2 = d3.select("p").append("svg");
const cx = 20;
const cy = 20;

d3.select("svg")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .transition()
    .duration(7000)
    .attr("cx", function(d, i) {
        return cx + i * Math.random() * 80;
    })
    .attr("cy", function(d, i) {
        return cy + i * Math.random() * 80;
    })
    .attr("fill", "red")
    .attr("r", function(d, i) {
        return Math.sqrt(d * 2);
    });
