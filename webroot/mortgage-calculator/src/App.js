import React, { Component } from 'react';
import Form from './Form';
import './App.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

class App extends Component {

	state = {
		purchasePrice: "",
		downPayment: "",
		selectedRadio: "percent",
		principal: "0.00",
		interest: "",
		term: "",
		payment: "0.00"
	}

	componentDidUpdate = () => {
		this.resetPayment();
		this.setPrincipal();
		this.setPayment();
	}

	resetPayment () {
		const hasNewPaymentState = this.hasNewPaymentState();
		const hasNewPurchasePriceState = this.hasNewPurchasePriceState();
		const hasNewInterestState = this.hasNewInterestState();
		const hasNewTermState = this.hasNewTermState();
		if (hasNewPaymentState === true && (hasNewPurchasePriceState === false || hasNewInterestState === false || hasNewTermState === false)) {
			this.setState({ payment : "0.00" })
		}
	}

	setPrincipal () {
		const percent = this.isPercent();
		const currentPrincipal = this.state.principal;
		const principalPercent = this.calcPrincipalPercent();
		const principalDollars = this.calcPrincipalDollars();
		if (percent === true && currentPrincipal !== principalPercent) {
			this.setState({ principal: principalPercent})
		} else if (percent === false && currentPrincipal !== principalDollars ) {
			this.setState({ principal: principalDollars})
		}
	}

	setPayment () {
		const payment = this.state.payment;
		const calcPayment = this.calcPayment();
		const purchasePrice = this.hasNewPurchasePriceState();
		const interest = this.hasNewInterestState();
		const term = this.hasNewTermState();
		if (payment !== calcPayment && purchasePrice === true && interest === true && term === true) {
			this.setState({ payment: calcPayment })
		}
	}

	calcPayment () {
		const principal = this.state.principal;
		const interest = this.state.interest;
		const term = this.state.term;
		return (principal * (interest/1200 * Math.pow((1 + interest/1200), term * 12)) / (Math.pow((1 + interest/1200), term * 12) - 1)).toFixed(2);
	}

	calcPrincipalPercent () {
		return this.state.purchasePrice * (1 - (this.state.downPayment / 100)).toFixed(2);
	}

	calcPrincipalDollars () {
		return (this.state.purchasePrice - this.state.downPayment).toFixed(2);
	}

	isPercent () {
		if (this.state.selectedRadio === "percent") {
			return true;
		} else {
			return false;
		}
	}

	hasNewPaymentState () {
		if (this.state.payment === "0.00") {
			return false;
		} else {
			return true;
		}
	}

	hasNewPurchasePriceState () {
		if (this.state.purchasePrice === "") {
			return false;
		} else {
			return true;
		}
	}

	hasNewInterestState () {
		if (this.state.interest === "") {
			return false;
		} else {
			return true;
		}
	}

	hasNewTermState () {
		if (this.state.term === "") {
			return false;
		} else {
			return true;
		}
	}

	handlePurchaseInput = event => 
		this.setState({ purchasePrice: event.target.value })

	handleDownPaymentRadio = event => 
		this.setState({ selectedRadio: event.target.value })

	handleDownPaymentInput = event =>
		this.setState({ downPayment: event.target.value })

	handleInterestInput = event =>
		this.setState({ interest: event.target.value })

	handleTermInput = event =>
		this.setState({ term: event.target.value })

	handleFormReset = (event) => {
		event.preventDefault()
		this.setState({
			purchasePrice: "",
			downPayment: "",
			principal: "0.00",
			selectedRadio: "percent",
			interest: "",
			term: "",
			payment: "0.00"
		})
	}

  	render() {
		return (
			<div className="App-container">
				<Card className="card">
					<CardHeader classes={{"title": "card-header-title", "root": "card-header"}} title="Mortgage Calculator" />
					<div>
						<Form
							purchasePrice={this.state.purchasePrice}
							handlePurchaseInput={this.handlePurchaseInput}

							downPayment={this.state.downPayment}
							handleDownPaymentInput={this.handleDownPaymentInput}
							selectedRadio={this.state.selectedRadio}
							handleDownPaymentRadio={this.handleDownPaymentRadio}
							
							principal={this.state.principal}

							interest={this.state.interest}
							handleInterestInput={this.handleInterestInput}

							term={this.state.term}
							handleTermInput={this.handleTermInput}
							
							payment={this.state.payment}
							
							handleFormReset={this.handleFormReset}
						/>
					</div>
				</Card>
			</div>
		);
  	}
}

export default App;


// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
      
//     </div>
//   );
// }

// export default App;
