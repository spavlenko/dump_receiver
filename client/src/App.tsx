import React, { Suspense } from 'react';
import { makeStyles } from '@ayx/ui-core';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from './Routes';
import { AppBar } from './AppBar';


const useStyles = makeStyles(() => ({
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.appWrapper}>
      <Router>
        <AppBar />
        <Suspense fallback={<div>Loading reports...</div>}>
          <div style={{ overflow: 'auto' }} id="scrollable-conainer">
            <Routes />
          </div>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
