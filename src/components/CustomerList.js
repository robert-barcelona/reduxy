import React,{Component} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = state => {
  console.log('state is', state)
  return { customers: state.customers , smooky:state.smooky};
};


const ConnectedCustomerList = ({customers}) => {
  console.log('about to map out customers and customers are',customers)

  return (
  <ul className="list-group list-group-flush">
    {customers.map((customer,i) => (
      <li className="list-group-item" key={customer.name + i}>
        {customer.name}
      </li>
    ))}
  </ul>
)};

const CustomerList = connect(mapStateToProps)(ConnectedCustomerList);

/*ConnectedCustomerList.propTypes = {
  customers: PropTypes.array.isRequired
};*/

export default CustomerList;
