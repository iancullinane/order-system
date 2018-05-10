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
import PreviousTable from 'components/table/previous-table.jsx';
import OrderForm from 'components/order/order-form';
import OrderGroup from 'components/order/order-group';
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
    this.state = {
      products: null,
      current_order: [],
      selected_product: [],
      quantity: 0,
      item_select: "",
    }
  }

  async componentDidMount() {
    const products = await this.getProducts()
    this.setState({products})
  }

  // async function
  async getProducts() {
    // await response of fetch call
    let response = await fetch('http://localhost:8000/api/v1/products');
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    
  };

  handleAddToOrder(){
    let newItem = {
      name: this.state.selected_product,
      quantity: this.state.quantity,
    }
    let copy = this.state.current_order;
    copy.push(newItem);
    this.setState({
      current_order: copy
    })
  }

  submitOrder(){
    console.log(this.state.current_order);
  }
  
  render(){
    const { classes } = this.props;

    return (
      <div>
        <Grid container alignContent={"center"} justify={"center"} className={classes.root} spacing={24}>
          
          <Grid item md={5} sm={10} >
            <OrderForm 
              {...this.state}
              onChange={this.handleChange.bind(this)}
              addToOrder={this.handleAddToOrder.bind(this)}
            />
          </Grid>
          
          <Grid item md={5} sm={10}>
            <OrderGroup 
              {...this.state}
              submitOrder={this.submitOrder.bind(this)}
            />
          </Grid>
          
          <Grid item xs={10}>
            <PreviousTable currentOrder={[]} />
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










