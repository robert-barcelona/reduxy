import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {modifyCustomer} from "../../actions/index"
import {Container, Row, Col, Button, Label, Input, Form, FormGroup} from 'reactstrap'

const mapDispatchToProps = dispatch => {
  return {
    onModifyCustomer: changedCustomer => dispatch(modifyCustomer(changedCustomer))
  };
}


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
    id: '',
  }

  componentDidMount() {
    const {props: {name, email, id}} = this
    this.setState({name, email, id})
  }

  onChangeName = (e) => {
    this.setState({name: e.target.value})
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }

  onSubmitChange = e => {
    const {props: {dismiss, onModifyCustomer}, state: {id, name, email}} = this
    e.preventDefault()
    onModifyCustomer({id, name, email})
    dismiss()
  }


  render() {
    const {state: {name, email},props:{dismiss}} = this

    return  <Form onSubmit={this.onSubmitChange}>
    <Container>
        <Row>
          <FormGroup>
            <Label for="changeName">Customer Name</Label>
            <Input value={name} id="changeName" onChange={this.onChangeName} type="text"/>
          </FormGroup>
        </Row>
        <Row>
        <FormGroup>
          <Label for="changeEmail">Customer Email</Label>
          <Input value={email} id="changeEmail" onChange={this.onChangeEmail} type="email"/>
        </FormGroup>
      </Row>
        <Row>
          <Col xs="12" md="6">
            <Button onClick={dismiss}>Cancel</Button>
          </Col>
          <Col xs="12" md="6">
            <Button onClick={this.onSubmitChange}>Submit</Button>
          </Col>
        </Row>
      </Container>
    </Form>
  }
}

const CustomerPopup = connect(null, mapDispatchToProps)(ConnectedCustomerPopup);

export default CustomerPopup;
