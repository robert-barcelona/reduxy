import React, {Component} from 'react';
import logic from './logic'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setCustomers} from "./actions/index";
import CustomerList from './components/CustomerList/CustomerList'
import store from './store'
import './App.css'
import {Navbar,NavbarBrand,Container, Row, Alert} from 'reactstrap'

const mapDispatchToProps = dispatch => {
  return {
    setCustomers: customers => dispatch(setCustomers(customers))
  };
}

class ConnectedApp extends Component {


  static propTypes = {
    setCustomers: PropTypes.func
  }


  state = {
    error: '',
    message:'',
  }

  customers = []

  onStoreChange = () => {
    const storeCustomers = store.getState().customers
    const dirtyCustomers = storeCustomers.filter(customer => customer.dirty)
    if (dirtyCustomers.length > 0) logic.updateCustomers(dirtyCustomers)
      .then(() => this.setMessage('','Successful update'))
      .catch(error => this.setMessage(error.toString(),''))
  }

  clearMessages = () => {
    this.setState({error:'',message:''})
  }

  setMessage = (error,message) => {
    this.setState({error,message})
    setTimeout(this.clearMessages,5000)
  }

  componentDidMount() {
    this.getCustomers()
    store.subscribe(this.onStoreChange)
  }

  getCustomers = () => {
    const {props: {setCustomers}} = this
    this.setState({error:'',message:''})
    logic.getCustomers()
      .then(customers => {
        this.customers = customers
        setCustomers(customers)
      })
      .catch(error => this.setState({error: error.toString()}))
  }

  render() {
    const {state: {message,error}} = this

    return <Container>
      <Navbar color="dark" dark >
        <NavbarBrand href="/">Landbot Customer Update</NavbarBrand>
      </Navbar>
      <Row>
       <h3 className="main__customerTitle">Customers</h3>
      </Row>
      <Row>
        <CustomerList/>
      </Row>
      <Row>
        {error && <Alert color="danger">
          {error}
        </Alert>}
      </Row>
      <Row>
      {message && <Alert color="info">
        {message}
      </Alert>}
    </Row>
    </Container>
  }
}

const App = connect(null, mapDispatchToProps)(ConnectedApp)
export default App
