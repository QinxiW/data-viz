// overall line graph of 5 inflation group on year

// Define the data for the line graph
const data = [
        [...window.headline_cpi], [...window.energy_cpi], [...window.food_cpi],
        [...window.core_cpi], [...window.producer_pi]
];

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

// Define the line function
const line = d3.line()
    .x(d => x(d.x))
    .y(d => y(d.y));

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
    .attr("class", "yTicks")
    .call(d3.axisLeft(y));

//Add horizontal gridlines
const yGrid = svg.append("g")
    .attr("class", "grid")
    // .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right).tickFormat(""))
    .attr("stroke", "lightgrey")
    .attr("opacity", 0.15)
;

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


// This allows to find the closest X index of the mouse:
var bisect = d3.bisector(function(d) { return d.x; }).left;

// Add cursor functionality
const cursor = svg.append("line")
    .attr("class", "cursor")
    .attr("x1", margin.left)
    .attr("x2", width)
    .attr("y1", margin.top)
    .attr("y2", height - margin.bottom)
    .attr("stroke", "grey")
    .attr("stroke-width", 4)
    .style("display", "none");

const annotation = svg
    .append("text")
    .attr("class", "annotation")
    .attr("x", 10)
    .attr("y", 10)
    .attr("fill", "black")
    .style("display", "none");
svg.on("mousemove", function() {
        const [mouseX, mouseY] = d3.mouse(this);
        console.log('mouseX: ' + mouseX)

        // Find closest X index
        const xValue = x.invert(mouseX);

        if (1970 < xValue < 2022){
                cursor.attr("x1", mouseX)
                    .attr("x2", mouseX)
                    .style("display", "block")
                    .attr("stroke-width", 2)
                ;
        } else {
                cursor.attr("x1", mouseX)
                    .attr("x2", mouseX)
                    .style("display", "none")
                    .attr("stroke-width", 2)
                ;
        }
        const bisectIndex = bisect(data[0], xValue, 1);
        const closestIndex = (bisectIndex >= data[0].length) ? data[0].length -1 : bisectIndex - 1;

        // Get the corresponding X value from the closest index
        const closestX = data[0][closestIndex].x;
        console.log('xValue: ' + xValue)
        if (closestX <= 1996){
                annotation
                    .attr("x", mouseX + 5)   //todo fix place
                    .attr("y", mouseY - 5)
                    .text(`year: ${closestX.toString()} | 
                headline: ${window.headline_cpi_dict[closestX].toFixed(2)},
                energy: ${window.energy_cpi_dict?.closestX?.toFixed(2) ?? '-'},
                food: ${window.food_cpi_dict[closestX].toFixed(2)},
                core: ${window.core_cpi_dict[closestX].toFixed(2)},
                producer: ${window.producer_pi_dict[closestX].toFixed(2)}`)
                    .attr("text-anchor", "start")
                    .attr("font-size", "12px")
                    .style("font-family", "Andale Mono")
                    .attr("transform", (d, i) => `translate(${margin.left}, ${margin.top + i * 10})`)
                    .style("display", "block");
        } else if (xValue <= 2022) {
                annotation
                    .attr("x", mouseX + 5)
                    .attr("y", mouseY - 5)
                    .text(`year ${closestX.toString()} | 
                headline: ${window.headline_cpi_dict[closestX].toFixed(2)},
                energy: ${window.energy_cpi_dict?.closestX?.toFixed(2) ?? '-'},
                food: ${window.food_cpi_dict[closestX].toFixed(2)},
                core: ${window.core_cpi_dict[closestX].toFixed(2)},
                producer: ${window.producer_pi_dict[closestX].toFixed(2)}`)
                    .attr("text-anchor", "end")
                    .attr("font-size", "12px")
                    .style("font-family", "Andale Mono")
                    .attr("transform", (d, i) => `translate(${margin.left}, ${margin.top + i * 10})`)
                    .style("display", "block");
        }

});

function mousemove() {
        const [mouseX, mouseY] = d3.mouse(this);
        const xValue = x.invert(mouseX);
        const yValue = y.invert(mouseY);
        // console.log('xValue: ' + xValue + 'yValue: ' + yValue);
        // const closest = data.map((line) => {
        //         const closestPointIndex = d3.scan(line, (a, b) => {
        //                 const distanceA = Math.sqrt((a.x - xValue) ** 2 + (a.y - yValue) ** 2);
        //                 const distanceB = Math.sqrt((b.x - xValue) ** 2 + (b.y - yValue) ** 2);
        //                 // console.log('distanceA: ' + distanceA);
        //                 // console.log('distanceB: ' + distanceB);
        //                 return distanceA - distanceB;
        //         });
        //         // console.log('closestPointIndex: ' + closestPointIndex);
        //         // console.log(line);
        //         return line[closestPointIndex];
        // });
        // focus.style("opacity", 1)
        // focusText.style("opacity",1)

        // focusText
        //     .html("type: "+ cptype + "year:" + selectedData.x + "  -  " + "inflation:" + selectedData.y)
        //     .attr("x", x(selectedData.x)+15)
        //     .attr("y", y(selectedData.y))
}
function mouseout() {
        focus.style("opacity", 0)
        // focusText.style("opacity", 0)
}

const annotations = [
        {
        note: {
                label:
                    "2008 crsis",
                title: "title test",
                wrap: 150,
                align: "middle"
        },
        //can use x, y directly instead of data
        data: { x: 2018, y: 10 },
        dy: -100,
        dx: 0,
        type: d3.annotationLabel,
        connector: { end: "dot" },
        }]

const makeAnnotations = d3.annotation()
    .editMode(true)
    //also can set and override in the note.padding property
    //of the annotation object
    .notePadding(15)
    .type(d3.annotationLabel)
    //accessors & accessorsInverse not needed
    //if using x, y in annotations JSON
    .accessors({
            x: d => x((d.x)),
            y: d => y(d.y)
    })
    .accessorsInverse({
            date: d => (x.invert(d.x)),
            close: d => y.invert(d.y)
    })
    .annotations(annotations)

d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)
