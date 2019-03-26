function buildMetadata(sample) {

  // Build the metadata panel
  const url = "/metadata/" + sample;

    let tbody = d3.select("#sample-metadata");

    tbody.html("");
    
    d3.json(url).then(function(data) {
      Object.entries(data).forEach(function([key, value]) {
        tbody.append("tr");
        tbody.append("td").text(key + ":  ");
        tbody.append("td").text(value);
      });
    });
}

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {

    const url = "/samples/" + sample;

    d3.json(url).then(function(data) {
      
    // Build a Pie Chart
  
    var trace1 = {
      values: data.sample_values.slice(0, 10),
      labels: data.otu_ids.slice(0, 10),
      //hoverinfo: data.otu_labels.slice(0, 10)
      type: 'pie'
    };

    // data
    var data1 = [trace1];

    
    var layout1 = {
      title: 'Belly Button Bacteria Types',
      showlegend: true,
      height: 400,
      width: 400
    };

    Plotly.newPlot("pie", data1, layout1);

// Bubble Chart using the sample data

    var trace2 = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: 'markers',
      marker: {
        size: data.sample_values,
        color: data.otu_ids,
        text: data.otu_labels
      }
    };
    
    var data1 = [trace2];
    
    var layout = {
      title: 'Belly Button Bacteria',
      showlegend: true,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot('bubble', data1, layout);
  
// // Enter a speed between 0 and 180
// var level = (data.WFREQ);
// console.log(data.WFREQ);
// // Trig to calc meter point
// var degrees = 180 - level,
//      radius = .5;
// var radians = degrees * Math.PI / 180;
// var x = radius * Math.cos(radians);
// var y = radius * Math.sin(radians);

// // Path: may have to change to create a better triangle
// var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
//      pathX = String(x),
//      space = ' ',
//      pathY = String(y),
//      pathEnd = ' Z';
// var path = mainPath.concat(pathX,space,pathY,pathEnd);

// var data3 = [{ type: 'scatter',
//    x: [0], y:[0],
//     marker: {size: 28, color:'850000'},
//     showlegend: false,
//     name: 'speed',
//     text: level,
//     hoverinfo: 'text+name'},
//   { values: [20/9, 20/9, 20/9, 20/9, 20/9, 20/9, 20/9, 20/9, 20/9],
//   rotation: 20,
//   text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
//   textinfo: 'text',
//   textposition:'inside',
//   marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
//                          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
//                          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
//                          'rgba(255, 255, 255, 0)', 'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)']},
//   labels: ['8-9', '7-8', '6-7', '5-6','4-5', '3-4', '2-3', '1-2', '0-1'],
//   hoverinfo: 'label',
//   hole: .5,
//   type: 'pie',
//   showlegend: false
// }];

// var layout3 = {
//   shapes:[{
//       type: 'path',
//       path: path,
//       fillcolor: '850000',
//       line: {
//         color: '850000'
//       }
//     }],
//   title: 'Washes per week', 
//   Speed: '0-100',
//   height: 300,
//   width: 300,
//   xaxis: {zeroline:false, showticklabels:false,
//              showgrid: false, range: [-1, 1]},
//   yaxis: {zeroline:false, showticklabels:false,
//              showgrid: false, range: [-1, 1]}
// };

// Plotly.newPlot('gauge', data3, layout3);

});

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
