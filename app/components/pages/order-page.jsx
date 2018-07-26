import React from 'react';
import PropTypes from 'prop-types';

// Vendor
import _ from 'underscore';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

// Src
import PreviousTable from 'components/table/previous-table.jsx';
import OrderForm from 'components/order/order-form';
import PendingOrder from 'components/order/pending-order';
import { getProducts } from 'components/data/products';
import { putOrder, getOrders } from 'components/data/orders';


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


var test = [
  {
    "item": {
      "id": 1,
      "name": "Pesto ½ pint",
      "description": "Prepackaged ½ pints of basil pesto in a 8oz container",
      "price": 6,
      "size": 8
    },
    "quantity": 5
  },
  {
    "item": {
      "id": 3,
      "name": "Ziti",
      "description": "Prepackaged handmade ziti pasta in a 12oz container",
      "price": 10,
      "size": 12
    },
    "quantity": 10
  }
]



class OrderPage extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      products: null,
      orders: null,
      current_order: test,
      selected_product: "",
      quantity: 0,
    }
  }

  async componentDidMount() {
    const products = await getProducts()
    const orders = await getOrders()

    this.setState({products, orders})
  }

  // Controlled component handler for all fields
  handleChange = prop => event => {
    if(prop == "selected_product"){
      console.log("Updating selected products");
    }
    this.setState({ [prop]: event.target.value });
  };

  // TODO fix this up
  addToPending(){
    
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
              addToPending={this.addToPending.bind(this)}
            />
          </Grid>
          
          <Grid item md={5} sm={10}>
            <PendingOrder
              {...this.state}
              submitOrder={this.submitOrder.bind(this)}
            />
          </Grid>
          
          {this.state.orders
            ? <Grid item xs={10}>
                <PreviousTable previousOrders={_.groupBy(this.state.orders, "order_number")} />
              </Grid>
            : null 
          }
          
        
        </Grid>

      </div>
    );
  }
}

OrderPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderPage);










