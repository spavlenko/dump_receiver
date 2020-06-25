import React from 'react';
import { Typography, Grid } from '@ayx/ui-core';

import { getGeneralInfo } from './getReports';

const InfoItem = ({ title, value }: any) => (
  <Grid container spacing={4}>
    <Grid item xs={6}>
      <Typography>{title}</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography color="textSecondary">{value}</Typography>
    </Grid>
  </Grid>
);

export const GeneralInfo = ({ reports }: any) => {
  const { total, usersTotal, firstReport, lastReport } = getGeneralInfo(reports);

  return (
    <>
      <InfoItem title="Total Reports Count" value={total} />
      <InfoItem title="Total Affected Users" value={usersTotal} />
      <InfoItem title="First Registration" value={firstReport} />
      <InfoItem title="Last Registration" value={lastReport} />
    </>
  );
}

