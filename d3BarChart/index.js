const chartWidth = window.innerWidth;
const chartHeight = window.innerHeight;

const chart = d3.select('body')
    .append('svg')
    .attr('id', 'chart');

const req = new window.XMLHttpRequest();
req.addEventListener('load', (res) => {
    const data = d3.csvParse(res.currentTarget.responseText);
    const regions = data.reduce((last, row) => {
        if (!last[row.Region])
            last[row.Region] = [];
        last[row.Region].push(row);
        return last;
    }, {});
    const regionsPctTurnout = Object.entries(regions)
        .map(([region, areas]) => ({
            region,
            meanPctTurnout: d3.mean(areas, d => d.Pct_Turnout),
        }));
    renderChart(regionsPctTurnout);
});
req.open('GET', 'data/EU-referendum-result-data.csv');
req.send();

function renderChart(data) {

    chart.attr('width', chartWidth)
        .attr('height', chartHeight);

    const x = d3.scaleBand()
        .domain(data.map(d => `${d.region}`))
        .rangeRound([50, chartWidth - 50])
        .padding(0.4);
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.meanPctTurnout)])
        .range([chartHeight - 50, 0]);

    const xAxis = d3.axisBottom().scale(x);
    const yAxis = d3.axisLeft().scale(y);

    chart.append('g')
        .attr('class', 'axis')
        .attr('transform',
            `translate(0, ${chartHeight - 50})`)
        .call(xAxis);
    chart.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(50, 0)')
        .call(yAxis);

    chart.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.region))
        .attr('y', chartHeight - 50)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .transition()
        .delay((d, i) => i * 20)
        .duration(800)
        .attr('y', d => y(d.meanPctTurnout))
        .attr('height', d =>
            (chartHeight - 50) - y(d.meanPctTurnout));
}