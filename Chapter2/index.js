async function lifeExpectancyTable() {
    console.log('in method')
    const getData = async () => {
        try {
            const response = await fetch('/data/who-gho-life-expectancy.json');
            const raw = await response.json();
            return raw.fact.filter(d => d.dims.GHO === 'Life expectancy at birth (years)'
                && d.dims.SEX === 'Both sexes' && d.dims.YEAR === '2016')
                .map(d => [
                    d.dims.REGION,
                    d.Value,
                ]);
        } catch (e) {
            console.error(e);
            return undefined;
        }
    };
    const data = await getData();
    data.unshift(['Region', 'Life expectancy (years from birth)']);
    return tableFactory(data)
        .table
        .selectAll('tr')
        .filter(i => i)
        .sort(([a, b], [c, d]) => {
            // sorting by descending
            return d - b;
        });
}

lifeExpectancyTable();

function renderSVGStuff() {
    const chart = chartFactory();
    const text = chart.container.append('text')
        .text("Ceci n'est pas un trajet!")
        .attr('x', window.innerWidth / 2)
        .attr('y', window.innerHeight / 2)
        .attr('text-anchor', 'middle');

    chart.container.append('circle')
        .attr('cx', 350)
        .attr('cy', 250)
        .attr('r', 100)
        .attr('fill', 'green')
        .attr('fill-opacity', 0.5)
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2);

    const ellipses = chart.container.append('ellipse')
        .attr('cx', 350)
        .attr('cy', 250)
        .attr('rx', 150)
        .attr('ry', 70)
        .attr('fill', 'green')
        .attr('fill-opacity', 0.3)
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 0.7);

    chart.container.append('ellipse')
        .attr('cx', 350)
        .attr('cy', 250)
        .attr('rx', 80)
        .attr('ry', 7);

    const rect = chart.container.insert('rect', 'circle')
        .attr('x', 200)
        .attr('y', 50)
        .attr('width', 300)
        .attr('height', 400)
        .attr('transform', 'translate(-200, -50)');

    rect.attr('stroke', 'green')
        .attr('stroke-width', 0.5)
        .attr('fill', 'white');

    chart.container.selectAll('ellipse, circle')
        .attr('transform', `translate(150, 0)
    scale(1.2)
    translate(-250, 0)
    rotate(-45, ${350 / 1.2}, ${250 / 1.2}) skewX(20)`);

}

renderSVGStuff();

// setInterval(()=>{    
//     console.log('pushing values...');
//     rows.push(['a', 'b', 'c', 'd', 'e', 'f']);
// }, 3000);