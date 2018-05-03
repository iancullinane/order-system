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
import SimpleTable from 'components/order/table';
import { awsUser } from 'utils/aws-user';


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

class OrderPage extends React.Component {
  
  constructor(props){
    super(props);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    
  };
  
  render(){
    const { classes } = this.props;

    return (
      <div>
        <Grid container alignContent={"center"} justify={"center"} className={classes.root} spacing={16}>
              <Grid item xs={10}>
                <SimpleTable />
              </Grid>
            </Grid>
      </div>
    );
  }
}

OrderPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderPage);










