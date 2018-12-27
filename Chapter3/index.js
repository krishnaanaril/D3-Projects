function yayPaths() {
    // const path = chart.container.append('path')
    //     // .attr('d', 'M 10 500 L 300 100 L 300 500 M 300 100 l 100 0 M 155 300 l 245 0 M 300 500 l 100 0')
    //     .attr('d', 'M 10 500 L 300 100 L 300 500 l 100 0 z')
    //     .attr('stroke', 'green')
    //     .attr('stroke-width', 2)
    //     .attr('fill', 'transparent');
    const chart = chartFactory();

    const sine = d3.range(0, 10).map(k => [0.5 * k * Math.PI, Math.sin(0.5 * k * Math.PI)]);

    const xSL = d3.scaleLinear()
        .range([
            0,
            (chart.width / 2) - (chart.margin.left + chart.margin.right),
        ])
        .domain(d3.extent(sine, d => d[0]));

    const y = d3.scaleLinear()
        .range([
            (chart.height / 2) - (chart.margin.top + chart.margin.bottom),
            0,
        ])
        .domain([-1, 1]);

    const line = d3.line()
        .x(d => xSL(d[0]))
        .y(d => y(d[1]));

    const g = chart.container.append('g');
    g.append('path')
        .datum(sine)
        .attr('d', line)
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    var curveArray = [
        { "d3Curve": d3.curveLinear, "curveTitle": "curveLinear" },
        { "d3Curve": d3.curveStep, "curveTitle": "curveStep" },
        { "d3Curve": d3.curveStepBefore, "curveTitle": "curveStepBefore" },
        { "d3Curve": d3.curveStepAfter, "curveTitle": "curveStepAfter" },
        { "d3Curve": d3.curveBasis, "curveTitle": "curveBasis" },
        { "d3Curve": d3.curveCardinal, "curveTitle": "curveCardinal" },
        { "d3Curve": d3.curveMonotoneX, "curveTitle": "curveMonotoneX" },
        { "d3Curve": d3.curveCatmullRom, "curveTitle": "curveCatmullRom" }
    ];
    let i = 0;

    setInterval(() => {
        d3.selectAll('#curve').remove();
        d3.selectAll('#curveText').remove();
        g.append('path')
            .datum(sine)
            .attr('id', 'curve')
            .attr('d', line.curve(curveArray[i % 8].d3Curve))
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('fill', 'none');

        g.append('text')
            .text(curveArray[i % 8].curveTitle)
            .attr('transform', 'translate(10, 600)')
            .attr('id', 'curveText');
        i++;
    }, 1000);

    // Area
    const g2 = chart.container.append('g')
        .attr('transform',
            `translate(${(chart.width / 2) + (chart.margin.left + chart.margin.right)}, ${chart.margin.top})`);

    const area = d3.area()
        .x(d => xSL(d[0]))
        .y0(chart.height / 2)
        .y1(d => y(d[1]))
        .curve(d3.curveBasis);

    const symbols = d3.symbol()
        .type(d => (d[1] > 0 ? d3.symbolTriangle : d3.symbolDiamond))
        .size((d, i) => (i % 2 ? 0 : 64));
    // .size(64);

    g2.append('path')
        .datum(sine)
        .attr('d', area)
        .attr('fill', 'steelblue')
        .attr('fill-opacity', 0.4);

    g2.append('path')
        .datum(sine)
        .attr('d', line.curve(d3.curveBasis))
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    g2.selectAll('path')
        .data(sine)
        .enter()
        .append('path')
        .attr('d', symbols)
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('fill', 'white')
        .attr('transform', d => `translate(${xSL(d[0])},${y(d[1])})`);
    // Arc

    const arc = d3.arc();
    const g3 = chart.container.append('g')
        .attr('transform',
            `translate(${chart.margin.left + chart.margin.right}, ${(chart.height / 2) + (chart.margin.top + chart.margin.bottom)})`);

    g3.append('path')
        .attr('d',
            arc({
                outerRadius: 100,
                innerRadius: 50,
                startAngle: 0,
                endAngle: Math.PI * 0.75
            }))
        .attr('transform', 'translate(150, 150)')
        .attr('fill', 'lightslategrey');

    // Chord/Ribbon
    const data = d3.zip(d3.range(0, 12), d3.shuffle(d3.range(0, 12)));
    const colors = ['linen', 'lightsteelblue', 'lightcyan', 'lavender',
        'red', 'gainsboro'];

    const ribbon = d3.ribbon()
        .source(d => d[0])
        .target(d => d[1])
        .radius(150)
        .startAngle(d => -2 * Math.PI * (1 / data.length) * d)
        .endAngle(d => -2 * Math.PI * (1 / data.length) * ((d - 1) %
            data.length));

    g3.append('g')
        .attr('transform', 'translate(300, 200)')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', ribbon)
        .attr('fill', (d, i) => colors[i % colors.length])
        .attr('stroke', (d, i) => colors[(i + 1) % colors.length]);
}

// yayPaths();

function axisDemos() {
    const chart = chartFactory({
        margin: { top: 30, bottom: 30, left: 30, right: 30 },
    });
    const amount = 200;

    const x = d3.scaleLinear()
        .domain([0, amount])
        .range([
            0,
            chart.width - chart.margin.right - chart.margin.left - 20,
        ]);

    const axis = d3.axisBottom()
        .scale(x);

    // chart.container.append('g')
    //     .data(d3.range(0, amount))
    //     .call(axis);

    const axes = [
        d3.axisBottom().scale(x),
        d3.axisTop().scale(x).ticks(5),
    ];
    
    axes.forEach((axis, i) =>
        chart.container.append('g')
            .data(d3.range(0, amount))
            .attr('transform',
                `translate(0,${(i * 50) + chart.margin.top})`)
            .call(axis)
    );
}

axisDemos();



