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
import AwsUser from 'utils/aws-user';
import enterCode from './enter-code';

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

class LoginPage extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirm: '',
      vendor_name: '',
      address: '',
      phone_number: '',
      error: null,
      waitForConfirmation: false,
    };
  }

  async signUpUser(){
    console.log(this.state);
  
    let user = new AwsUser();
  
    if(this.state.password === this.state.password_confirm){
      const result = await user.SignUpUser(
        this.state.email, 
        this.state.password,
        this.state.address,
        this.state.vendor_name,
      ).then(x => console.log(x));
      
      // console.log(result);
    } else {
      this.setState({error: "Passwords don't match"});
    }
  }
  
  toggleConfirmation(){
    this.setState({waitForConfirmation: true});
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    
  };
  
  render(){
    const { classes } = this.props;
    return (
      <div>
        {this.state.waitForConfirmation 
          ? <Grid container alignContent={"center"} justify={"center"} className={classes.root} spacing={16}>
              <Grid item xs={5}>
                <EnterCode />
              </Grid>
            </Grid>

          : <Grid container alignContent={"center"} justify={"center"} className={classes.root} spacing={16}>
              <Grid item xs={5}>
                <Login /> 
              </Grid>
              <Grid item xs={5}>
                <Signup
                  {...this.state}
                  signUpUser={this.signUpUser.bind(this)}
                  onChange={this.handleChange.bind(this)} 
                  toggleConfirmation={this.toggleConfirmation.bind(this)}  
                /> 
              </Grid>
            </Grid>
            
        }
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);










