import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';


import test_data from 'test/test-data';
// import SimpleTable from 'components/table';

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

function PaperTemplate(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={props.size}>
          <Paper className={classes.paper}>
            {props.children}
          </Paper>

        </Grid>
      </Grid>
    </div>
  );
}

PaperTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperTemplate);