import React from 'react';
//import PropTypes from 'prop-types';
import { Input, InputLabel, InputAdornment } from '@material-ui/core';
import { FormControl, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

const Form = props => {  
    return <form className="form-body">
      <FormControl id="purchase-price">
        <InputLabel className="form" htmlFor="purchasePrice">Purchase Price</InputLabel>
        <Input 
          className="form"
          type="number"
          step="any" 
          onChange={props.handlePurchaseInput}
          value={props.purchasePrice}
        />
      </FormControl>
      <br />
      <FormControl id="down-payment">
        <InputLabel className="form" htmlFor="downPayment">Down Payment</InputLabel>
        <Input 
          className="form" 
          type="number"
          step="any"
          onChange={props.handleDownPaymentInput}
          value={props.downPayment}
        />
      </FormControl>
      <FormControl>
        <FormControlLabel
          value="percent"
          label="%"
          control={
            <Radio 
              id="radio-percent"
              checked={props.selectedRadio === "percent"}
              onChange={props.handleDownPaymentRadio} 
            />}
        />
      </FormControl>
      <FormControl>
        <FormControlLabel
          value="dollars"
          label="$"
          control={
            <Radio 
              checked={props.selectedRadio === "dollars"}
              onChange={props.handleDownPaymentRadio} 
            />}
        />
      </FormControl>
      <div className="form">
        <p>Loan amount</p>
        <p className="dollar-figures">${props.principal}</p>
      </div>
      <FormControl>
        <InputLabel className="form" htmlFor="interest">Interest Rate (APR)</InputLabel>
        <Input
          className="form" 
          id="interest" 
          type="number"
          step="any" 
          onChange={props.handleInterestInput}
          value={props.interest}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
        />
      </FormControl>
      <br />
      <FormControl id="loan-term">
        <InputLabel className="form" htmlFor="term">Loan term</InputLabel>
        <Input 
          className="form" 
          id="term"
          type="number" 
          onChange={props.handleTermInput}
          value={props.term}
          endAdornment={<InputAdornment position="end">years</InputAdornment>}
        />
      </FormControl>
      <div className="form">
        <p>Monthly payment</p>
        <p className="dollar-figures">${props.payment}</p>
      </div>
      <Button onClick={props.handleFormReset} className="reset-button" >
        Reset
      </Button>
    </form>
  }

// Form.propTypes = {
//   purchasePrice: PropTypes.string.isRequired,
//   handlePurchaseInput: PropTypes.func.isRequired,
  
//   downPayment: PropTypes.string.isRequired,
//   handleDownPaymentInput: PropTypes.func.isRequired,
//   selectedRadio: PropTypes.string.isRequired,
//   handleDownPaymentRadio: PropTypes.func.isRequired,
  
//   principal: PropTypes.string.isRequired,

//   interest: PropTypes.string.isRequired,
//   handleInterestInput: PropTypes.func.isRequired,

//   term: PropTypes.string.isRequired,
//   handleTermInput: PropTypes.func.isRequired,

//   payment: PropTypes.string.isRequired,

//   handleFormReset: PropTypes.func.isRequired
// }

export default Form