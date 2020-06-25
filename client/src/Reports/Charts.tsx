import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Grid } from '@ayx/ui-core';
import { groupBy, map } from 'lodash';

const colors = [
  '#0082ca', // theme.palette.brand.corporateBlue,
  '#05dcac', // theme.palette.brand.greenApple,
  '#79e9d7', // theme.palette.brand.blueJazz,
  '#eb5e70', // theme.palette.brand.hotSauce,
  '#ffc6c3', // theme.palette.brand.cottonCandy,
  '#0d2345', // theme.palette.brand.deepSpace,
  '#b6fbaf', // theme.palette.brand.wasabi
  '#5a61c5' // theme.palette.brand.grapeSoda,
]

const buildData = ({ labels, data }: { labels: string[], data: (string|number)[]}) => ({
  labels,
  datasets: [{
    data,
    backgroundColor: colors,
    hoverBackgroundColor: colors
  }]
})

export const Charts = ({ reports }: any) => {
  const byVersion = groupBy(reports, 'application_info.app_version');
  const byOs = groupBy(reports, 'os_name');
  const reportsByVersion = buildData({
    labels: Object.keys(byVersion),
    data: map(byVersion, (value) => value.length)
  });

  const reportsByOs = buildData({
    labels: Object.keys(byOs),
    data: map(byOs, (value) => value.length)
  });

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          Reports By App version
          <Doughnut data={reportsByVersion} legend={{position: 'bottom', fullWidth: false }}/>
        </Grid>
        <Grid item xs={5}>
          Reports By OS
          <Doughnut data={reportsByOs} legend={{position: 'bottom', fullWidth: false }}/>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}

