const protoChart = {
    width: window.innerWidth,
    height: window.innerHeight,
    margin: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
    },
};

function chartFactory(opts, proto = protoChart) {
    const chart = Object.assign({}, proto, opts);
    
    chart.svg = d3.select('body')
        .append('svg')
        .attr('id', chart.id || 'chart')
        .attr('width', chart.width - chart.margin.right)
        .attr('height', chart.height - chart.margin.bottom)
        .style('border', '4px solid black');

    chart.container = chart.svg.append('g')
        .attr('id', 'container')
        .attr('transform', `translate(${chart.margin.left}, ${chart.margin.top})`);
        
    return chart;
}