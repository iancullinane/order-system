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
  }
});

class Signup extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirm: '',
      vendor_name: '',
      address: '',
      phone_number: '',
    };
  };
  

  printState = () => {
    console.log(this.state);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render(){

    const { classes } = this.props;
    
    return (
      <Paper className={classes.paper}>
        <Typography>
            Signup
        </Typography>
        <Input
          placeholder="Email"
          className={classes.input}
          type={"text"}
          value={this.state.email}
          onChange={this.handleChange('email')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Password"
          className={classes.input}
          type={"password"}
          value={this.state.password}
          onChange={this.handleChange('password')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Repeat Password"
          className={classes.input}
          type={"password"}
          value={this.state.password_confirm}
          onChange={this.handleChange('password_confirm')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Name of Business"
          className={classes.input}
          type={"type"}
          value={this.state.vendor_name}
          onChange={this.handleChange('vendor_name')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Address"
          className={classes.input}
          type={"type"}
          value={this.state.address}
          onChange={this.handleChange('address')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
        <Input
          placeholder="Phone Number"
          className={classes.input}
          type={"type"}
          value={this.state.phone_number}
          onChange={this.handleChange('phone_number')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />        
        <div className={classes.center}>
          <Button 
          variant="raised" 
          className={classes.button}
          onClick={this.printState}>
            Register
          </Button>
        </div>
      </Paper>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);






