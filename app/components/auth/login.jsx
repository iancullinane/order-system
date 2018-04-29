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
import SignUpUser from 'utils/aws-user';


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

class Login extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  };

  // someFunction(something){};  


  printState = () => {
    console.log(this.state);
    
    // console.log(err);
    // SignUpUser(this.state.email, this.state.password, '781-775-8050')
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
        <div className={classes.center}>
          <Button 
          variant="raised" 
          className={classes.button}
          onClick={this.printState}>
            Login
          </Button>
        </div>
      </Paper>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);






