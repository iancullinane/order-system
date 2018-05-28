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

import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu'

// Src
import { PaperTemplate, GridWrapper } from 'components/body';
import { Paper } from 'material-ui';
import { awsUser } from 'utils/aws-user';

const styles = theme => ({
  flex: {
    flexGrow: 1,
  },
  formTitle: {
    color: "black",
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  formItemSmall: {
    margin: theme.spacing.unit,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing.unit * 2,
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
  }
});

var poolData = {
  UserPoolId : 'us-east-2_SqPWkjFhx', // Your user pool id here
  ClientId : '5e86924ighs70itck1816rajbi' // Your client id here
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
    },
};

function itemDetails(id, array){
  var result = array.filter(function( obj ) {
    return obj.id == id;
  });
  return (
    <Typography>
      {result.name}
    </Typography>
  );
}

function OrderForm(props) {

  const { classes } = props;
  
  return (
    <Paper className={classes.paper}>
      <Typography 
        className={classes.formTitle}
        variant="display1" 
        gutterBottom>
          Order
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-product">Product</InputLabel>
        {props.products
          ? <Select
              value={props.selected_product}
              onChange={props.onChange("selected_product")}
              input={<Input id="select-product" />}
              MenuProps={MenuProps}
            >
              {props.products.map(product => (
                  <MenuItem
                      key={product.id}
                      value={product.id}
                  >
                  {product.name}
                  </MenuItem>
              ))}
            </Select>
          : null }
      </FormControl>

      <FormControl className={classes.formItemSmall}>
        <InputLabel htmlFor="quantity">Quantity</InputLabel>
        <Input
          placeholder="Quantity"
          type={"number"}
          value={props.quantity}
          onChange={props.onChange('quantity')}
          inputProps={{
            'aria-label': 'Description',
          }}
        />       
      </FormControl>

      {props.selected_product != ""
        ? itemDetails(props.selected_product, props.products)
        : null
      }      

      {props.test_product.name != ""
        ? <Typography>
            {props.test_product.name}
          </Typography>
       : null
      }   

      <FormControl className={classes.formControl}>
        <Button 
          variant="raised" 
          className={classes.button}
          onClick={props.addToOrder}>
            Add to order
        </Button>
        {props.login_error 
          ? <Typography>
              {props.login_error.code}
            </Typography>
          : null
        }
      </FormControl>
    </Paper>
  )};


OrderForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderForm);






