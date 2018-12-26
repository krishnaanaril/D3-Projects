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
// setInterval(()=>{    
//     console.log('pushing values...');
//     rows.push(['a', 'b', 'c', 'd', 'e', 'f']);
// }, 3000);