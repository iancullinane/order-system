import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead'; 
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
});

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
          map.set(key, [item]);
      } else {
          collection.push(item);
      }
  });
  return map;
}


function PreviousOrderTable(props) {
  const { classes } = props;

  console.log(props.previousOrders);

  let thisTable = props.previousOrders[1].map((n, i) => (
        <TableRow key={i}>
          <TableCell>{n.product_id}</TableCell>
          <TableCell numeric>{n.quantity}</TableCell>
        </TableRow>        
      ));

  
  thisTable.push(
    <TableRow key={"end"}>
      <TableCell>Total</TableCell>
      <TableCell numeric>100</TableCell>
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

PreviousOrderTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviousOrderTable);
