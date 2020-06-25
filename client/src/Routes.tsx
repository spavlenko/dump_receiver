import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Reports } from './Reports';
import { Report } from './Report';
import { useScrollToTop } from './utils';

export const Routes = () => {
  useScrollToTop();

  return (
    <>
      <Switch>
        <Route path="/reports/:id">
          <Report />
        </Route>
        <Route path="/reports">
          <Reports />
        </Route>
        <Route path="/">
          <Reports />
        </Route>
      </Switch>
    </>
  );
}
