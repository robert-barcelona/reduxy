import React, {Component} from 'react';
import logic from './logic'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setCustomers} from "./actions/index";
import CustomerList from './components/CustomerList'
import store from './store'

const mapDispatchToProps = dispatch => {
  return {
    setCustomers: customers => dispatch(setCustomers(customers))
  };
}

class ConnectedApp extends Component {

  state = {
    error: '',
  }

  customers = []

  onStoreChange = () => {
    const storeCustomers = store.getState().customers
    const dirtyCustomers = storeCustomers.filter(customer => customer.dirty)
    if (dirtyCustomers.length > 0) logic.updateCustomers(dirtyCustomers)
      .then(response => console.log('successful update',))
      .catch(error => this.setState({error: error.toString()}))
  }

  componentDidMount() {
    this.getCustomers()
    store.subscribe(this.onStoreChange)
  }

  getCustomers = () => {
    const {props: {setCustomers}} = this

    logic.getCustomers()
      .then(customers => {
        this.customers = customers
        setCustomers(customers)
      })
      .catch(error => this.setState({error: error.toString()}))
  }

  render() {
    const {state: {error}} = this

    return <div>
      <CustomerList/>
      {error && <h4>{error}</h4>}
    </div>
  }
}

const App = connect(null, mapDispatchToProps)(ConnectedApp)
export default App
