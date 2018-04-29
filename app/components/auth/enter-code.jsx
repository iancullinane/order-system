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


class EnterCode extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      error: null,
    };
  };

  render(){

    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Typography>
            Validate Email
        </Typography>
        <Input
          placeholder="Validation code"
          className={classes.input}
          type={"text"}
          value={this.state.validation_code}
          onChange={this.props.handleChange('validation_code')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />
       
        <Button 
          variant="raised" 
          className={classes.button}
          onClick={this.props.registerFunction}>
            Register User
        </Button>
        
      </Paper>
    );
  }
}

EnterCode.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnterCode);






