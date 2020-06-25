import React from 'react';
import { makeStyles, Link, Typography } from '@ayx/ui-core';
import DataTable from '@ayx/ui-core-lab/DataTable';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import '@ayx/ui-core-lab/DataTable/ag-theme-balham.css';
import '@ayx/ui-core-lab/DataTable/ag-theme-balham-dark.css';

import { useScrollToTop } from '../utils';

import { getReports, reportsMapper } from './getReports';
import { GeneralInfo } from './GeneralInfo';
import { Charts } from './Charts';

const reports = getReports();

const useStyles = makeStyles(() => ({
  dataTableWrapper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flexGrow: 1,
    padding: '8px',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto'
  }
}));


const reportsSchema = [
  {
    headerName: 'Event Timestamp',
    field: 'eventTime',
  },
  { headerName: 'Current App Version', field: 'currentAppVersion' },
  { headerName: 'Event Type', field: 'eventType' },
  { headerName: 'File', field: 'file' },
  { headerName: 'OS', field: 'os' },
  { headerName: 'User', field: 'userName' },
  { headerName: 'Hostname', field: 'hostName' },
];

const ROW_HEIGHT = 48;
const HEADER_HEIGHT = 56;
const BOTTOM_GUTTER = 100;

export const Reports = () => {
  const classes = useStyles();
  const { events } = reports.read();
  const { push } = useHistory();
  const tableHeight = ROW_HEIGHT * events.length + HEADER_HEIGHT + BOTTOM_GUTTER;

  useScrollToTop();

  return (
    <div className={classes.dataTableWrapper}>
      <Typography component="h5" gutterBottom variant="h5">
        General
      </Typography>
      <GeneralInfo reports={events} />
      <br />
      <Typography component="h5" gutterBottom variant="h5">
        Statistics
      </Typography>
      <Charts reports={events} />
      <Typography component="h5" gutterBottom variant="h5">
        Reports
      </Typography>
      <div style={{ height: `${tableHeight}px` }}>
        <DataTable
          columnDefs={reportsSchema}
          defaultColDef={{
            filter: true,
            sortable: true
          }}
          modules={[ClientSideRowModelModule]}
          rowData={reportsMapper(events)}
          onRowClicked={({ data }) => {
            push(`/reports/${data.key}`);
          }}
          onGridReady={({ columnApi }) => {
            // columnApi.sizeColumnsToFit('100%'); //(reportsSchema.map(({ field }) => field));
          }}
        />
      </div>
    </div>
  );
}

