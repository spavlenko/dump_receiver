import React from 'react';
import { makeStyles, Typography, Link } from '@ayx/ui-core';
import { map } from 'lodash';
import { useParams, Link as RouterLink } from 'react-router-dom';

import { getReports, MOCK_STACK, RawReport } from '../Reports/getReports';
import { useScrollToTop } from '../utils';

const reports = getReports();

const useStyles = makeStyles(() => ({
  container: {
    padding: '8px',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto'
  },
  reportWrapper: {
    border: '2px solid #e2e2e2',
  },
  table: {
    boxShadow: '0px 0px 0px 1px #e2e2e2',
    display: 'flex',
    flexDirection: 'row'
  },
  titleCol: {
    boxShadow: '0px 0px 0px 1px #e2e2e2',
    display: 'flex',
    width: '200px',
    padding: '8px'
  },
  contentCol: {
    boxShadow: '0px 0px 0px 1px #e2e2e2',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: '8px'
  }
}));

const RecursiveTable = ({ title, content }: any) => {
  const isRecursiveCase = typeof content === 'object' && !Array.isArray(content);
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <div className={classes.titleCol}>{title}</div>
      <div className={classes.contentCol} style={{padding: typeof content === 'object' ? '0' : '8px'}}>
        {isRecursiveCase ? map(content, (value, subtitle) => (
          <RecursiveTable title={subtitle} content={value} key={subtitle} />
        )) : 
          Array.isArray(content)
          ? map(content, (value, i) => <div key={i} className={classes.contentCol}>{value}</div>)
          : content
        }
      </div>
    </div>
  );
}

export const Report = () => {
  useScrollToTop();

  const classes = useStyles();
  const { id } = useParams();

  const { events } = reports.read();
  const rawReport = events.find((e: RawReport) => e.key == id);
  // TODO: Remove when BE returns actual stack:
  const stackTrace = rawReport.event_info.stack_trace || MOCK_STACK;
  rawReport.event_info.stack_trace = Array.isArray(stackTrace) ? stackTrace : stackTrace.trim().split('\n');
  
  if (!rawReport) {
    return <span>Report not found</span>;
  }

  return (
    <div className={classes.container}>
      <Typography component="h5" gutterBottom variant="h5">
        <Link component={RouterLink} to="/">Reports</Link> - Report #{id}
      </Typography>
      <div className={classes.reportWrapper}>
        {map(rawReport, (value, title) => (
          <RecursiveTable key={title} title={title} content={value} />
        ))}
      </div>
    </div>
  );
}

