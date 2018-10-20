import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import CustomerPopup from '../CustomerPopup/CustomerPopup'
import {Container, Row, Col,ListGroupItem,ListGroup} from 'reactstrap'
import './CustomerList.css'

const mapStateToProps = state => {
  return {customers: state.customers};
};


class ConnectedCustomerList extends Component {

  state = {
    isPop: false,
    popCust: null,
  }

  onCustomerClick = (customer) => {
    this.setState({isPop: true, popCust: customer})
  }

  dismissPopup = () => {
    this.setState({isPop: false, popCust: null})
  }


  render() {
    const {props: {customers}, state: {popCust, isPop}} = this

    return <Container >
      <Row>
        <Col xs="12" md="5" className="customerList__main">

          {!(isPop && popCust) && <ListGroup className="list-group list-group-flush">
            {customers.map((customer, i) => (
              <ListGroupItem  tag="button" action onClick={e => this.onCustomerClick(customer)} className="list-group-item" key={customer.name + i}>
                {customer.name}&nbsp;<i className="fas fa-user"></i>
              </ListGroupItem>
            ))}
            {customers.length === 0 && <span>Loading customers...</span>}
          </ListGroup>}
          {isPop && popCust && <CustomerPopup
            id={popCust.id}
            name={popCust.name}
            email={popCust.email}
            dismiss={this.dismissPopup}
          />}
        </Col>
      </Row>
    </Container>
  };
}


const CustomerList = connect(mapStateToProps)(ConnectedCustomerList);

ConnectedCustomerList.propTypes = {
  customers: PropTypes.array.isRequired
}

export default CustomerList;
