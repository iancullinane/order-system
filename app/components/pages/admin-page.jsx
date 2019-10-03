import React from 'react';
import PropTypes from 'prop-types';

// Vendor
import _ from 'underscore';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

// Src
import { getProducts } from 'components/data/products';



const styles = {
  root: {
    flexGrow: 1,
    height: "100%",
    marginTop: "75px",
  },
  column:{
    width: "33%",
    marginBottom: "20px",
  },
};

class AdminPage extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      products: null,
    }
  }

  async componentDidMount() {
    const products = await getProducts()

    this.setState({products})
  }



  render(){
    const { classes } = this.props;

    return (
      <div>
        {/* Top level container */}
        <Grid 
          container 
          className={classes.root} 
          alignContent={"center"} 
          justify={"center"} 
          spacing={24}
        >
          <Grid item md={5} sm={10} >
            <P>Something</P>
          </Grid>
          
          <Grid item md={5} sm={10}>
            <P>Somethinge else</P>
          </Grid>
          
          
        
        </Grid>

      </div>
    );
  }
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPage);










