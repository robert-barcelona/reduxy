import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {modifyCustomer} from "../actions"

const mapDispatchToProps = dispatch => {
  return {
    onModifyCustomer: changedCustomer => dispatch(modifyCustomer(changedCustomer))
  };
};


class ConnectedCustomerPopup extends Component {

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    dismiss: PropTypes.func,
    onModifyCustomer: PropTypes.func,
  }


  state = {
    name: '',
    email: '',
    id:'',
  }

  componentDidMount() {
    const {props: {name, email,id}} = this
    this.setState({name, email,id})
  }

  onChangeName = (e) => {
    this.setState({name: e.target.value})
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }

  onSubmitChange = e => {
    const {props:{dismiss,onModifyCustomer},state:{id,name,email}} = this
    e.preventDefault()
    onModifyCustomer({id,name,email})
    dismiss()
  }


  render() {
    const {state: {name, email}} = this

    return <form onSubmit={this.onSubmitChange}>
      <input value={name} onChange={this.onChangeName} type="text"/>
      <input value={email} onChange={this.onChangeEmail} type="email"/>
      <input type="submit" value="Submit" />
    </form>

  }
}

const CustomerPopup = connect(null, mapDispatchToProps)(ConnectedCustomerPopup);

export default CustomerPopup;
