import React from 'react';
import PropTypes from 'prop-types';

// Vendor
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'

// Src
import { PaperTemplate, GridWrapper } from 'components/body';
import Paper  from '@material-ui/core/Paper';
import { awsUser } from 'utils/aws-user';

import GenericTable from 'components/table/table';

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
  },
  disclaimer: {
    marginTop: "5px",
    marginBottom: "5px",
    textAlign: "right",
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



function PendingOrder(props) {

  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <Typography 
        className={classes.formTitle}
        variant="display1" 
        gutterBottom>
          Current Order
      </Typography>

      <GenericTable
        currentOrder={props.current_order}
      />

      <Button 
        variant="raised" 
        className={classes.button}
        onClick={props.submitOrder}>
          Submit Order
      </Button>


    </Paper>
  )};


PendingOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PendingOrder);






