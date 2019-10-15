import React from 'react';
import PropTypes from 'prop-types';

// Vendor
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'

// Src
import { PaperTemplate, GridWrapper } from 'components/body';
import Paper  from '@material-ui/core/Paper';
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

function itemDetails(props){
  var result = props.products.filter(function( obj ) {
    return obj.id == props.selected_product;
  });

  return (
    <div>
      <Typography variant={"headline"}>
        {result[0].name} x {props.quantity}
      </Typography>
      <Typography variant={"caption"}>
        Price: ${result[0].price.toFixed(2)}
      </Typography>
      <Typography variant={"caption"}>
        Size: {result[0].size}oz
      </Typography>
      <Typography variant={"body1"}>
        {result[0].description}
      </Typography>
    </div>
  );
}

function generateProductSelection(props){
  return (
    <Select
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
  )
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
          ? generateProductSelection(props)
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
          
      {/* Display the details field for selected item */}
      <div className={classes.formControl}>
        {props.selected_product != ""
          ? itemDetails(props)
          : null
        }      
      </div>

      {/* Submit button */}
      <FormControl className={classes.formControl}>
        <Button 
          variant="raised" 
          className={classes.button}
          onClick={props.addToPending}>
            Add to order
        </Button>
        {props.login_error 
          ? <Typography>
              {props.login_error.code}
            </Typography>
          : null
        }
      </FormControl>

      {props.error 
        ? <Typography>{props.error}</Typography>
        : null 
      }
    </Paper>
  )};


OrderForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderForm);






