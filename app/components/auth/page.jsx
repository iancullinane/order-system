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
import { PaperTemplate } from 'components/body';
import RegistrationForm from 'components/auth/register'
import Signup from 'components/auth/signup'
import Login from 'components/auth/login'

const styles = {
  root: {
    flexGrow: 1,
    height: "100%",
    marginTop: "75px",
  },
  content: {
    marginTop: "75px",
    height: "100%",
  },
  column:{
    width: "33%",
    marginBottom: "20px",
  },
};

function LoginPage(props) {
  const { classes } = props;
  return (
    <div>
      <Grid container alignContent={"center"} justify={"center"} className={classes.root} spacing={16}>
        <Grid item xs={5}>
            <Login /> 
        </Grid>
        <Grid item xs={5}>
            <Signup /> 
        </Grid>

      </Grid>
    </div>
  );
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);










