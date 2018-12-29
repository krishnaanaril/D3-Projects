
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

const chartSVG = ((enabled) => {
    if (!enabled)
        return;
    const chart = chartFactory();
})(false);

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

// Section flowcontrol generators and promise
const UlamSpiral = ((enabled) => {
    if (!enabled)
        return;
    const chart = chartFactory();

    const generateSpiral = (n) => {
        const spiral = [];
        let x = 0;
        let y = 0;
        const min = [0, 0];
        const max = [0, 0];
        let add = [0, 0];
        let direction = 0;
        const directions = {
            up: [0, -1],
            left: [-1, 0],
            down: [0, 1],
            right: [1, 0],
        };

        d3.range(1, n).forEach((i) => {
            spiral.push({ x, y, n: i });
            add = directions[['up', 'left', 'down', 'right'][direction]];
            x += add[0];
            y += add[1];
            if (x < min[0]) {
                direction = (direction + 1) % 4;
                min[0] = x;
            }
            if (x > max[0]) {
                direction = (direction + 1) % 4;
                max[0] = x;
            }
            if (y < min[1]) {
                direction = (direction + 1) % 4;
                min[1] = y;
            }
            if (y > max[1]) {
                direction = (direction + 1) % 4;
                max[1] = y;
            }
        });
        return spiral;
    }

    const dot = d3.symbol().type(d3.symbolCircle).size(3);
    const center = window.innerHeight / 2;
    const l = 2;
    const x = (x, l) => center + (l * x);
    const y = (y, l) => center + (l * y);

    function generatePrimes(n) {

        function* numbers(start) {
            while (true) {
                yield start++;
            }
        }

        function* filter(seq, prime) {
            for (let num of seq) {
                if (num % prime !== 0) {
                    yield num;
                }
            }
        }

        function* primes() {
            var seq = numbers(2); // Start on 2.
            var prime;
            while (true) {
                prime = seq.next().value;
                yield prime;
                seq = filter(seq, prime);
            }
        }

        function* getPrimes(count, seq) {
            while (count) {
                yield seq.next().value;
                count--;
            }
        }

        let results = [];
        for (let prime of getPrimes(n, primes())) {
            results.push(prime);
        }

        return results;
    }

    const primes = generatePrimes(2000);
    const sequence = generateSpiral(d3.max(primes)).filter(d =>
        primes.indexOf(d.n) > -1);

    chart.container.selectAll('path')
        .data(sequence)
        .enter()
        .append('path')
        .attr('transform', d => `translate(${x(d.x, l)}, ${y(d.y, l)})`)
        .attr('d', dot);

    const scale = 8;
    const regions = d3.nest()
        .key(d => Math.floor(d.x / scale))
        .key(d => Math.floor(d.y / scale))
        .rollup(d => d.length)
        .map(sequence);

    const values = d3.merge(d3.keys(regions)
        .map(_x => d3.values(regions[_x])));
    const median = d3.median(values);
    const extent = d3.extent(values);
    const shades = (extent[1] - extent[0]) / 2;

    regions.each((_x, _xKey) => {
        _x.each((_y, _yKey) => {
            let color,
                red = '#e23c22',
                green = '#497c36';
            if (_y > median) {
                color = d3.rgb(green).brighter(_y / shades);
            } else {
                color = d3.rgb(red).darker(_y / shades);
            }
            chart.container.append('rect')
                .attr('x', x(_xKey, l * scale))
                .attr('y', y(_yKey, l * scale))
                .attr('width', l * scale)
                .attr('height', l * scale)
                .style('fill', color)
                .style('fill-opacity', 0.9);
        });
    });

})(false);