///Generate 100 random points within an svg canvas with a height of 500 pixels and width of 500 pixels:
const data = Array.from({ length: 100 }, () => ({
  x: Math.random() * 500,
  y: Math.random() * 500,
}));

console.log(data);

///Display points as a scatter plot using D3 JS library:
const svg = d3.select('svg');

svg
  .selectAll('circle')
  .data(data)
  .join('circle')
  .attr('cx', (d) => d.x)
  .attr('cy', (d) => d.y)
  .attr('r', 5);

///Load a titanic.csv dataset as a CSV file using D3 JS:
d3.csv('titanic.csv').then((data) => {
  console.log(data);
});

///Generate a pie chart for age distribution for passengers:
// Load the CSV file
d3.csv('titanic.csv').then((data) => {

  // Group the data by age, and count the number of passengers in each age group
  const ageData = d3.group(data, (d) => {
    if (!d.Age) {
      return 'Unknown';
    }
    const age = parseInt(d.Age);
    if (age < 18) {
      return '0-17';
    } else if (age >= 18 && age <= 60) {
      return '18-60';
    } else {
      return '60+';
    }
  });
  
  const pieData = Array.from(ageData, ([key, value]) => ({
    age: key,
    count: value.length,
  }));

  // Set up the pie chart
  const pieWidth = 500;
  const pieHeight = 500;
  const pieRadius = Math.min(pieWidth, pieHeight) / 2 - 10;

  const pie = d3
    .pie()
    .value((d) => d.count)
    .sort(null);

  const arc = d3.arc().innerRadius(0).outerRadius(pieRadius);

  const pieSvg = d3
    .select('body')
    .append('svg')
    .attr('width', pieWidth)
    .attr('height', pieHeight);

  const pieG = pieSvg
    .append('g')
    .attr('transform', `translate(${pieWidth / 2}, ${pieHeight / 2})`);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  // Add the slices to the pie chart
  pieG
    .selectAll('path')
    .data(pie(pieData))
    .join('path')
    .attr('d', arc)
    .attr('fill', (d) => colorScale(d.data.age))
    .attr('stroke', 'white')
    .attr('stroke-width', 2);

  // Add a legend for the pie chart
  const legend = pieSvg.append('g').attr('transform', `translate(${pieWidth - 150}, 20)`);

  legend
    .selectAll('rect')
    .data(pieData)
    .join('rect')
    .attr('x', 0)
    .attr('y', (d, i) => i * 25)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', (d) => colorScale(d.age));

  legend
    .selectAll('text')
    .data(pieData)
    .join('text')
    .attr('x', 30)
    .attr('y', (d, i) => i * 25 + 15)
    .text((d) => `${d.age}: ${d.count}`)
    .style('font-size', '14px');
});
