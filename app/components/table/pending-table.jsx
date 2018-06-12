import React from 'react';
import _ from 'underscore';
import { withStyles } from 'material-ui/styles';

import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import {CalculateTotal} from "utils/values"
import { CalculateTax } from '../../utils/values';
import { SALES_TAX } from 'config/config.js';

const styles = theme => ({
  root: {
    display: "flex",
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  pullRight: {
    textAlign: "right",
  },
});


var buildTable = function(props){
  let tableData = props.currentOrder;
  const { classes } = props;
  let keys = tableData[0] ? Object.keys(tableData[0]) : "empty";

}



var buildTableBody = function(props){

  
  const { classes } = props;
  
  const totals = true;
  const taxable = true;
  let tableData = props.currentOrder;

  let total_quanitity = CalculateTotal(tableData, "quantity");
  let total_cost = CalculateTotal(tableData, "price");
  
  let thisTable = tableData.map((n, i) => (
    <TableRow key={i}>
      <TableCell>{n.item.name}</TableCell>
      <TableCell numeric>{n.quantity}</TableCell>
      <TableCell numeric>${(n.item.price * n.quantity).toFixed(2)}</TableCell>
    </TableRow>        
  ));

  // Make the total row
  totals 
    ? thisTable.push(
        <TableRow key={"end"}>
          <TableCell>Total plus {(SALES_TAX * 100).toFixed(2)}% sales tax</TableCell>
          <TableCell className={classes.pullRight}>{total_quanitity}</TableCell>
          <TableCell className={classes.pullRight}>${total_cost}</TableCell>
        </TableRow>)
    : null ;



  return (
    
    <TableBody>
      {thisTable}
    </TableBody>
  )
}

var addHeader = function(){
  return(
    <TableHead>
      <TableRow>
        <TableCell>Product Name</TableCell>
        <TableCell numeric>Quantity</TableCell>
        <TableCell numeric>Price</TableCell>
      </TableRow>
    </TableHead> 
  )
}

const GenericTable = ({props}) => (
  
  <Table>
    {addHeader()}
    {buildTableBody(props)} 
  </Table>
)




function PendingOrderTable(props) {
  const { classes } = props;
  
  return (
    <Paper className={classes.root}>
      <GenericTable props={props} />
    </Paper>
  );
}

PendingOrderTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PendingOrderTable);
