import React from 'react';
import PropTypes from 'prop-types';

// Vendor
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input, { InputLabel, InputAdornment } from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


// Src
import { PaperTemplate } from 'components/body';
import RegistrationForm from 'components/auth/register';
import Signup from 'components/auth/signup'
import Login from 'components/auth/login'
import { awsUser } from 'utils/aws-user';
import EnterCode from 'components/auth/enter-code';

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
      login_email: '',
      password: '',
      login_password: '',
      password_confirm: '',
      vendor_name: '',
      address: '',
      phone_number: '',
      login_error: null,
      signup_error: null,
      waitForConfirmation: false,
      cognitoUser: null,
      
    };
  }

  async authenticateUser(){
    
    console.log(this.state.login_email, this.state.login_password);
    const result = await awsUser.AuthenticateUser(this.state.login_email, this.state.login_password)
      .then((result)=>{
        console.log(result);
      }).catch((err)=>{ 
        this.setState({login_error: err});
      }
    );
  }

  async signUpUser(){
    if(this.state.password === this.state.password_confirm){
      
      const result = await awsUser.SignUpUser(
        this.state.email, 
        this.state.password,
        this.state.address,
        this.state.vendor_name,
      ).then((result)=>{
        
        this.setState(
          {
            waitForConfirmation: true,
            cognitoUser: result.user
          }
        );
        console.log(`registered`);
        
      }).catch((err)=>{ 
        this.setState({signup_error: err});
      });
      
    } else {
      this.setState({signup_error: "Passwords don't match"});
    }
  }
  
  async confirmUser(){
    const result = await awsUser.ConfirmUser(
      this.state.cognitoUser, 
      this.state.validation_code
    ).then((result)=>{
      console.log(`registered`);
    }).catch((err)=>{ 
      console.log(err.code);
    });
  }

  // toggleConfirmation(){
  //   this.setState({waitForConfirmation: true});
  // }

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
                <EnterCode 
                  registerFunction={this.confirmUser.bind(this)} 
                  handleChange={this.handleChange.bind(this)}
                />
              </Grid>
            </Grid>

          : <Grid container alignContent={"center"} justify={"center"} className={classes.root} spacing={16}>
              <Grid item xs={5}>
                <Login
                  {...this.state}
                  authenticateUser={this.authenticateUser.bind(this)}
                  onChange={this.handleChange.bind(this)}  /> 
              </Grid>
              <Grid item xs={5}>
                <Signup
                  {...this.state}
                  signUpUser={this.signUpUser.bind(this)}
                  onChange={this.handleChange.bind(this)} 
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










