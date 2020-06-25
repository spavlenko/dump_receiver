import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Grid } from '@ayx/ui-core';
import { groupBy, map } from 'lodash';

const colors = [
  '#0082ca', // theme.palette.brand.corporateBlue,
  '#05dcac', // theme.palette.brand.greenApple,
  '#79e9d7', // theme.palette.brand.blueJazz,
  '#eb5e70', // theme.palette.brand.hotSauce,
  '#ffc6c3', // theme.palette.brand.cottonCandy,
  // '#0d2345', // theme.palette.brand.deepSpace,
  // '#b6fbaf', // theme.palette.brand.wasabi
  '#5a61c5' // theme.palette.brand.grapeSoda,
]

const buildData = (chartColors: string[], { labels, data }: { labels: string[], data: (string|number)[]}) => ({
  labels,
  datasets: [{
    data,
    backgroundColor: chartColors,
    hoverBackgroundColor: chartColors
  }]
})

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Reports Trend',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: '#0082ca', // theme.palette.brand.corporateBlue,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#0082ca', // theme.palette.brand.corporateBlue,
      pointHoverBackgroundColor: '#0082ca', // theme.palette.brand.corporateBlue,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export const Charts = ({ reports }: any) => {
  const byVersion = groupBy(reports, 'application_info.app_version');
  const byOs = groupBy(reports, 'os_name');
  const byEventType = groupBy(reports, 'event_info.event_type');

  const options = {
    legend: {
      position: 'bottom',
      fullWidth: false 
    },
    circumference:1 * Math.PI,
    rotation: -1 * Math.PI
  };

  const reportsByVersion = buildData(colors, {
    labels: Object.keys(byVersion),
    data: map(byVersion, (value) => value.length)
  });

  const reportsByOs = buildData([...colors.slice(-1), ...colors.slice(1)], {
    labels: Object.keys(byOs),
    data: map(byOs, (value) => value.length)
  });

  const reportsByEventType = buildData([...colors.slice(-2), ...colors.slice(2)], {
    labels: Object.keys(byEventType),
    data: map(byEventType, (value) => value.length)
  });

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          Reports By App version
          <Doughnut data={reportsByVersion} options={options} />
        </Grid>
        <Grid item xs={4}>
          Reports By OS
          <Doughnut data={reportsByOs} options={options} />
        </Grid>
        <Grid item xs={4}>
          Reports By Event Type
          <Doughnut data={reportsByEventType} options={options} />
        </Grid>
      </Grid>
      {/* <div style={{height: '200px'}}>
        <Line data={data} options={{maintainAspectRatio: false}}/>
      </div> */}
    </>
  );
}

