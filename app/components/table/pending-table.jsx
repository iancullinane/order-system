import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import _ from 'underscore';

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


var calculateTotal = function(arr){

  if (arr.length == 0){
    return 0;
  }

  var sum = _.pluck(arr, "quantity");
  console.log(sum)
  var total = sum.reduce((a, b)=>{
    return Number(a) + Number(b);
  })
  return total;
}


function PendingOrderTable(props) {
  const { classes } = props;

  var total = calculateTotal(props.currentOrder)


  let thisTable = props.currentOrder.map((n, i) => (
        <TableRow key={i}>
          <TableCell>{n.name}</TableCell>
          <TableCell numeric>{n.quantity}</TableCell>
        </TableRow>        
      ));

  

  thisTable.push(
    <TableRow key={"end"}>
      <TableCell>Total</TableCell>
      <TableCell className={classes.pullRight}>{total}</TableCell>
    </TableRow>        
  )

  
  // let thisTablePlus = addToEnd(thisTable);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell numeric>Quantity</TableCell>
          </TableRow>
        </TableHead> 
        <TableBody>
          {thisTable}
        </TableBody>        
      </Table>
    </Paper>
  );
}

PendingOrderTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PendingOrderTable);
