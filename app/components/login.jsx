import React from 'react';
import PropTypes from 'prop-types';

// Vendor
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';


// Src
import PaperTemplate from 'components/body';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  column:{
    width: "33%",
  },
};

function Login(props) {
  const { classes } = props;
  return (
    <div>
        <PaperTemplate size={12}>

          <FormControl className={classes.column}>
            <InputLabel htmlFor="adornment-amount">Email Address (will also be used as login)</InputLabel>
            <Input
              id="adornment-amount"
              placeholder={"123 Basil Rd"}
              startAdornment={<InputAdornment position="start">></InputAdornment>}
            />
          </FormControl>
          <FormControl className={classes.column}>
            <InputLabel htmlFor="adornment-amount">Password</InputLabel>
            <Input
              id="adornment-amount"
              placeholder={"123 Basil Rd"}
              startAdornment={<InputAdornment position="start">></InputAdornment>}
            />
          </FormControl>

          <FormControl className={classes.column}>
            <InputLabel htmlFor="adornment-amount">You company address</InputLabel>
            <Input
              id="adornment-amount"
              placeholder={"123 Basil Rd"}
              startAdornment={<InputAdornment position="start">></InputAdornment>}
            />
          </FormControl>

          <FormControl fullWidth className={classes.label}>
            <InputLabel htmlFor="adornment-amount">Vendor Name</InputLabel>
            <Input
              id="adornment-amount"
              placeholder={"Your company name"}
              startAdornment={<InputAdornment position="start">></InputAdornment>}
            />
          </FormControl>
    
          <FormControl fullWidth className={classes.label}>
            <InputLabel htmlFor="adornment-amount">You company address</InputLabel>
            <Input
              id="adornment-amount"
              placeholder={"123 Basil Rd"}
              startAdornment={<InputAdornment position="start">></InputAdornment>}
            />
          </FormControl>

        </PaperTemplate>
    </div>
  );
}

// Login.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Login);










