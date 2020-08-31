export const loadAndProcessData = () =>
  Promise
    .all([
      d3.csv('https://gist.githubusercontent.com/Jason-Manbodh/ec74038efc61c51cc7686fa6dd501233/raw/28e79093686ce8bb99a1bb7f32e54cb997251c19/weatherTrends.csv'),
    ])
    .then((data) =>
    {
       data[0].forEach(d=>{
       d.temperature = +d.temperature;
       // console.log(d.temperature);
       d.date = new Date(d.date);
        });
       // console.log(data)
        return data[0]
    }

    );
