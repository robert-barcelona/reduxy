import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import CustomerPopup from './CustomerPopup'

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
    this.setState({isPop:false,popCust:null})
  }


  render() {
    const {props: {customers},state:{popCust,isPop}} = this

    return <div>
      <ul className="list-group list-group-flush">
        {customers.map((customer, i) => (
          <li onClick={e => this.onCustomerClick(customer)} className="list-group-item" key={customer.name + i}>
            {customer.name}
          </li>
        ))}
      </ul>
    {isPop && popCust &&  <CustomerPopup
      id={popCust.id}
      name={popCust.name}
      email={popCust.email}
      dismiss={this.dismissPopup}
      />}

    </div>
  };
}


const CustomerList = connect(mapStateToProps)(ConnectedCustomerList);

ConnectedCustomerList.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerList;
