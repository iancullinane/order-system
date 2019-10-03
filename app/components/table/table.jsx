import React from 'react';
import _ from 'underscore';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead'; 
import TableRow from '@material-ui/core/TableRow';
import { CalculateTotal } from "utils/values"
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


var createTableRow = function(index, rowData){
  
  return (
    <TableRow key={index}>
      <TableCell>{rowData.item.name}</TableCell>
      <TableCell numeric>{rowData.quantity}</TableCell>
      <TableCell numeric>${(rowData.item.price * rowData.quantity).toFixed(2)}</TableCell>
    </TableRow> 
  )
}

var addTotalRow = function(thisTable, tableData){
  
  const totals = true;
  const taxable = true;

  let total_quanitity = CalculateTotal(tableData, "quantity");
  let total_cost = CalculateTotal(tableData, "price");

    // // Make the total row
  totals 
    ? thisTable.push(
        <TableRow key={"end"}>
          <TableCell>Total plus {(SALES_TAX * 100).toFixed(2)}% sales tax</TableCell>
          <TableCell numeric>{total_quanitity}</TableCell>
          <TableCell numeric>${total_cost}</TableCell>
        </TableRow>)
    : null ;
}


var buildTableBody = function(props){

  
  const { classes } = props;
  
  let tableData = props.currentOrder;

  let thisTable = tableData.map((n, i) => 
    createTableRow(i, n)  
  );
  addTotalRow(thisTable, tableData);


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

const MakeTable = ({props}) => (
  <Table>
    {addHeader()}
    {buildTableBody(props)} 
  </Table>
)

function extractHeaders(currentOrder){
  console.log(currentOrder)
}


function GenericTable(props) {
  const { classes } = props;
  
  extractHeaders(props.currentOrder)

  return (
    <Paper className={classes.root}>
      <MakeTable props={props} />
    </Paper>
  );
}

GenericTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenericTable);
