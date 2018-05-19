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


var calculateTotal = function(){
  console.log("do things");
  return 0
}


function PendingOrderTable(props) {
  const { classes } = props;

  var total = calculateTotal()
  console.log(total);


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
