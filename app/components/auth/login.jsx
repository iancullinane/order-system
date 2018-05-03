import React from 'react';
import PropTypes from 'prop-types';

// Vendor
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

// Src
import { PaperTemplate, GridWrapper } from 'components/body';
import { Paper } from 'material-ui';
import { awsUser } from 'utils/aws-user';

const styles = theme => ({
  root: {
    marginTop: "75px",
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  column:{
    width: "33%",
    marginBottom: "20px",
  },
  center: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    margin: "auto",
    padding: theme.spacing.unit * 2,
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
  },
  input: {
    width: "100%",
    marginBottom: "15px",
  },
  submitRow: {
    flexDirection: "row",
  }

});

var poolData = {
  UserPoolId : 'us-east-2_SqPWkjFhx', // Your user pool id here
  ClientId : '5e86924ighs70itck1816rajbi' // Your client id here
};

// 

function Login(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
        <Typography>
            Login
        </Typography>
        <Input
          placeholder="Email"
          className={classes.input}
          type={"text"}
          value={props.login_email}
          onChange={props.onChange('login_email')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Password"
          className={classes.input}
          type={"password"}
          value={props.login_password}
          onChange={props.onChange('login_password')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />       
        
        <Button 
          variant="raised" 
          className={classes.button}
          onClick={props.authenticateUser}>
            Login User
        </Button>
        {props.login_error 
          ? <Typography>
              {props.login_error.code}
            </Typography>
          : null
        }
        
      </Paper>
  )};


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);






