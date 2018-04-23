
import React from 'react';
import PropTypes from 'prop-types';

// Vendor
import { withStyles } from 'material-ui/styles';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';





function RegistrationForm(props) {
  
  return (
      <form>
        <FormControl>
            <InputLabel>Email Address</InputLabel>
            <Input
            placeholder={"123 Basil Rd"}
            />
        </FormControl>
        
        <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
            placeholder={"123 Basil Rd"}
            />
        </FormControl>

        <FormControl>
            <InputLabel>You company address</InputLabel>
            <Input
            placeholder={"123 Basil Rd"}
            />
        </FormControl>

        <FormControl fullWidth >
            <InputLabel>Vendor Name</InputLabel>
            <Input
            placeholder={"Your company name"}
            />
        </FormControl>

        <FormControl fullWidth >
            <InputLabel>You company address</InputLabel>
            <Input
            placeholder={"123 Basil Rd"}
            />
        </FormControl>
    </form>
  )
}



export default RegistrationForm










