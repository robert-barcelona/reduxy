import {MODIFY_CUSTOMER,SET_CUSTOMERS} from "../constants/action-types"

export const modifyCustomer = (customer) => ({
  type: MODIFY_CUSTOMER,
  payload: customer
});

export const setCustomers = customers => ({
  type: SET_CUSTOMERS,
  payload: customers
});
