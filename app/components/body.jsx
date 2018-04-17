import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import test_data from 'test/test-data';
import SimpleTable from 'components/table';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
  },
});

function FullWidthGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="headline" gutterBottom>
              Orders Pending
            </Typography>

            <SimpleTable />

          </Paper>

        </Grid>
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);