import { Chart } from "react-google-charts";

const Analysis = () => {
    return (
        // <h1>Biểu đồ</h1>
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', maxWidth: 1200 }}>
                <Chart
                    width={550}
                    height={300}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['City', '2010 Population', '2000 Population'],
                        ['New York City, NY', 8175000, 8008000],
                        ['Los Angeles, CA', 3792000, 3694000],
                        ['Chicago, IL', 2695000, 2896000],
                        ['Houston, TX', 2099000, 1953000],
                        ['Philadelphia, PA', 1526000, 1517000],
                    ]}
                    options={{
                        title: 'Population of Largest U.S. Cities',
                        chartArea: { width: '30%' },
                        hAxis: {
                            title: 'Total Population',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'City',
                        },
                    }}
                    legendToggle
                />
                <Chart
                    width={550}
                    height={'300px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Year', 'Sales', 'Expenses'],
                        ['2013', 1000, 400],
                        ['2014', 1170, 460],
                        ['2015', 660, 1120],
                        ['2016', 1030, 540],
                    ]}
                    options={{
                        title: 'Company Performance',
                        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                        vAxis: { minValue: 0 },
                        // For the legend to fit, we make the chart area smaller
                        chartArea: { width: '50%', height: '70%' },
                        // lineWidth: 25
                    }}
                />
            </div>
            <div style={{ display: 'flex' }}>
                <Chart
                    width={550}
                    height={'300px'}
                    chartType="ComboChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                            'Month',
                            'Bolivia',
                            'Ecuador',
                            'Madagascar',
                            'Papua New Guinea',
                            'Rwanda',
                            'Average',
                        ],
                        ['2004/05', 165, 938, 522, 998, 450, 614.6],
                        ['2005/06', 135, 1120, 599, 1268, 288, 682],
                        ['2006/07', 157, 1167, 587, 807, 397, 623],
                        ['2007/08', 139, 1110, 615, 968, 215, 609.4],
                        ['2008/09', 136, 691, 629, 1026, 366, 569.6],
                    ]}
                    options={{
                        title: 'Monthly Coffee Production by Country',
                        vAxis: { title: 'Cups' },
                        hAxis: { title: 'Month' },
                        seriesType: 'bars',
                        series: { 5: { type: 'line' } },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
                <Chart
                    width={550}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Year', 'Sales', 'Expenses', 'Profit'],
                        ['2014', 1000, 400, 200],
                        ['2015', 1170, 460, 250],
                        ['2016', 660, 1120, 300],
                        ['2017', 1030, 540, 350],
                    ]}
                    options={{
                        // Material design options
                        chart: {
                            title: 'Company Performance',
                            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
        </div>


    )
}

export default Analysis;