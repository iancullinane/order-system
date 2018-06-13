import React from 'react';
import PropTypes from 'prop-types';

// Vendor
import _ from 'underscore';
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
import { getProducts } from 'components/data/products';
import { putOrder } from 'components/data/orders';


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

class OrderPage extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      products: null,
      current_order: [],
      selected_product: "",
      test_product: {
        name: ""
      },
      quantity: 0,
      item_select: "",
    }
  }

  async componentDidMount() {
    const products = await getProducts()
    this.setState({products})
  }

  // Controlled component handler for all fields
  handleChange = prop => event => {
    if(prop == "selected_product"){
      console.log("Updating selected products");
    }
    this.setState({ [prop]: event.target.value });
  };

  // TODO fix this up
  handleAddToOrder(){
    
    if(this.state.quantity === 0){
      this.setState({error: "Cannot add zero"});
      return
    }

    // Capture the currently selected object and quantity
    let newItem = {
      item: _.find(this.state.products, (product) => {
        return product.id === this.state.selected_product
      }),
      quantity: Number(this.state.quantity),
    }
    
    let copy = this.state.current_order;
    var match = _.find(copy, (obj) => { return obj.item.id === newItem.item.id });
    
    if (match) {
        match.quantity += newItem.quantity;
    } else {
      copy.push(newItem);
    }

    this.setState({
      current_order: copy
    });
  }

  async submitOrder(){
    console.log(this.state.current_order);
    let incoming = { payload: this.state.current_order }
    const orders = await putOrder(incoming)
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










