import { MODIFY_CUSTOMER,SET_CUSTOMERS } from "../constants/action-types";



const customerReducer = (state = [], action) => {
  console.log('in customer reducer, action =',action)
  switch (action.type) {
    case MODIFY_CUSTOMER:
      const customer = action.payload
      if (!customer) return state
      customer.dirty = true
      const i = state.findIndex(element => element.id === customer.id)
      if (i === -1) return state
      const arr0 = state.slice(0,i)
      const arr1 = state.slice(i+1)
      return [...arr0,customer,...arr1]
    case SET_CUSTOMERS:
      return [...state,...action.payload]
    default:
      return state
  }
};

export default customerReducer;
