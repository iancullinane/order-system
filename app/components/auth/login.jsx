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
import LoginOrSignup from 'components/auth/login-signup'

const styles = {
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
};

function Login(props) {
  const { classes } = props;
  return (
    <div>
      <LoginOrSignup />
      <PaperTemplate size={12}>
        <RegistrationForm />
      </PaperTemplate>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);










