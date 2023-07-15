// filter by type and year change
const slider = d3.select("#slider");
const output = d3.select("body").append("p");
// default init
output.text(1970);
// Update the output value when the slider changes
slider.on("input", function() {
    output.text(this.value);
});