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
import AwsUser from 'utils/aws-user';

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

function Signup(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
        <Typography>
            Signup
        </Typography>
        <Input
          placeholder="Email"
          className={classes.input}
          type={"text"}
          value={props.email}
          onChange={props.onChange('email')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Password"
          className={classes.input}
          type={"password"}
          value={props.password}
          onChange={props.onChange('password')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Repeat Password"
          className={classes.input}
          type={"password"}
          value={props.password_confirm}
          onChange={props.onChange('password_confirm')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Name of Business"
          className={classes.input}
          type={"type"}
          value={props.vendor_name}
          onChange={props.onChange('vendor_name')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Address"
          className={classes.input}
          type={"type"}
          value={props.address}
          onChange={props.onChange('address')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Phone Number"
          className={classes.input}
          type={"type"}
          value={props.phone_number}
          onChange={props.onChange('phone_number')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />        
        
        <Button 
          variant="raised" 
          className={classes.button}
          onClick={props.signUpUser}>
            Register User
        </Button>
        {props.error 
          ? <Typography>
              {props.error.code}
            </Typography>
          : null
        }
        
      </Paper>
  )};


Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);






