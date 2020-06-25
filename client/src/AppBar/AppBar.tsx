import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, IconButton, Link, Typography, Toolbar, AppBar as CoreAppBar } from '@ayx/ui-core';
import { Menu } from '@ayx/icons';

export const AppBar = () => (
  <CoreAppBar position="static">
    <Toolbar>
      <Grid alignItems="center" container spacing={4}>
        <Grid item>
          <IconButton aria-label="Menu" color="inherit">
            <Menu />
          </IconButton>
        </Grid>
        <Grid item xs>
        <Link component={RouterLink} to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <Typography color="inherit" variant="h6">
            AMP Engine CRS
          </Typography>
        </Link>
        </Grid>
      </Grid>
    </Toolbar>
  </CoreAppBar>
);

