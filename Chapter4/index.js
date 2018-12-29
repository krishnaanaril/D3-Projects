
(function sampleScale(enabled) {
    if (enabled) {
        const scale = d3.scaleOrdinal()
            .domain(['triangle', 'line', 'pacman', 'square'])
            .range(['red', 'yellow', 'green', 'red']);

        console.log(scale('pacman'));
    }
}(false));

const scalesDemo = (enabled => {
    if (enabled) { // main block, put code here }
        console.log('in enabled block');
    }
})(false); // set to true to see this stuff

const chart = chartFactory();

(function ordinalScales(enabled) {
    if (enabled) {
        const data = d3.range(30);
        const colors = d3.scaleOrdinal(d3.schemeCategory10);
        const points = d3.scalePoint()
            .domain(data)
            .range([0, chart.height])
            .padding(1.0);
        const bands = d3.scaleBand()
            .domain(data)
            .range([0, chart.width])
            .padding(0.1);

        chart.container.selectAll('path')
            .data(data)
            .enter()
            .append('path')
            .attr('d', d3.symbol()
                .type(d3.symbolCircle)
                .size(50)
            )
            .attr('transform', d => `translate(${(chart.width / 2)}, ${points(d)})`)
            .style('fill', d => colors(d));

        const schemes = ['10', '20', '20b', '20c'];
        schemes.forEach((scheme, i) => {
            const height = 10;
            const padding = 5;
            const categoryScheme = `schemeCategory${scheme}`;
            console.log(`Scheme: ${categoryScheme}`);
            const selector = `rect.scheme-${scheme}`;
            const categoryColor = d3.scaleOrdinal(d3[categoryScheme]);
            chart.container.selectAll(selector)
                .data(data.slice())
                .enter()
                .append('rect')
                .classed(selector, true)
                .attr('x', d => bands(d))
                .attr('y', (chart.height / 2) - ((i * height) +
                    (padding * i)))
                .attr('width', bands.bandwidth)
                .attr('height', height)
                .style('fill', d => categoryColor(d));
        });
    }
}(false)); // set to true to see this stuff

(function quantitativeScales(enabled) {
    if (enabled) {
        const weierstrass = (x) => {
            const a = 0.5;
            const b = (1 + 3 * Math.PI / 2) / a;
            return d3.sum(d3.range(100).map(
                n => Math.pow(a, n) * Math.cos(Math.pow(b, n) * Math.PI * x)));
        };

        const data = d3.range(-100, 100).map(d => d / 200);
        const extent = d3.extent(data.map(weierstrass));
        const colors = d3.scaleOrdinal(d3.schemeCategory10);
        const x = d3.scaleLinear()
            .domain(d3.extent(data))
            .range([0, chart.width]);

        const drawSingle = line => chart.container.append('path')
            .datum(data)
            .attr('d', line)
            .style('stroke-width', 2)
            .style('fill', 'none');

        const linear = d3.scaleLinear()
            .domain(extent)
            .range([chart.height / 4, 0]);

        const line1 = d3.line()
            .x(x)
            .y(d => linear(weierstrass(d)));

        drawSingle(line1)
            .attr('transform', `translate(0, ${chart.height / 16})`)
            .style('stroke', colors(25));

        const offset = 100;
        const quantize = d3.scaleQuantize()
            .domain(extent)
            .range(d3.range(-1, 2, 0.5)
                .map(d => d * 100));

        const line5 = line1.x(x)
            .y(d => quantize(weierstrass(d)));

        drawSingle(line5)
            .attr('transform', `translate(0, ${(chart.height / 2) + offset})`)
            .style('stroke', colors(4));

        const threshold = d3.scaleThreshold()
            .domain([-1, 0, 1])
            .range([-50, 0, 50, 100]);

        const line6 = line1.x(x)
            .y(d => threshold(weierstrass(d)));

        drawSingle(line6)
            .attr('transform', `translate(0, ${(chart.height / 2) + (offset * 2)})`)
            .style('stroke', colors(5));
    }
}(false));

(function timeFormat(enabled) {
    if (enabled) {
        const parseFormat = d3.timeParse('%Y-%m-%d');
        const stringFormat = d3.timeFormat('%Y-%m-%d');
        console.log(parseFormat('2018-12-29'));
        console.log(stringFormat(new Date()));
    }
}(false));

(function misc(enabled) {
    if (enabled) {
        d3.select("body").insert('button', 'svg')
            .text('Change data')
            .on('click', () => {
                alert('clicked');
            });

        // Both 1 and 2 are similar
        // 1
        d3.text('./data.txt')
            .then((text) => {
                console.log(text);
            })
            .catch((error) => {
                console.error(error);
            });

        // 2    
        function done() {
            console.log(this.responseText); // Finished!
        }

        const req = new XMLHttpRequest();
        req.addEventListener('load', done)
        req.open('get', './data.txt');
        req.send();


        // Use of Promise

        const ex = new Promise((resolve, reject) => {
            resolve({ 'hello': krishna })
        })

        ex
            .then(x => {
                console.log(x)
            })
            .catch(err => {
                console.error(err);
            })
    }
}(false));

