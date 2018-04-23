import React from 'react';
import PropTypes from 'prop-types';

// Vendor
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';


// Src
import { PaperTemplate, GridWrapper } from 'components/body';
import { Paper } from 'material-ui';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  column:{
    width: "33%",
    marginBottom: "20px",
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function LoginOrSignup(props) {
  const { classes } = props;
  
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography>
                Login or Signup
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography>
                Login
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography>
                Login
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

LoginOrSignup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginOrSignup);






