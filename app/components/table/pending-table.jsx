import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import _ from 'underscore';

import {CalculateTotal} from "utils/values"

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
  
  let totals = true;
  let tableData = props.currentOrder;
  
  let thisTable = tableData.map((n, i) => (
    <TableRow key={i}>
      <TableCell>{n.item.name}</TableCell>
      <TableCell numeric>{n.quantity}</TableCell>
      <TableCell numeric>{n.item.price * n.quantity}</TableCell>
    </TableRow>        
  ));

  totals 
    ? thisTable.push(
        <TableRow key={"end"}>
          <TableCell>Total</TableCell>
          <TableCell className={classes.pullRight}>{CalculateTotal(tableData, "quantity")}</TableCell>
          <TableCell className={classes.pullRight}>{CalculateTotal(tableData, "price")}</TableCell>
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
