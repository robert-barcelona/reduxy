import axios from 'axios'


const logic = {

  _base: 'https://cors-anywhere.herokuapp.com/https://api.landbot.io',
  _token: '53e7c23afbeb7106365b1b6fedc4504981c09435',

  /**
   * validate that field contains string value
   * throws error if not
   *
   * @param fieldName:string
   * @param fieldValue:*
   * @private
   */
  _validateStringField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
  },

  /**
   * validate that field contains number value
   * throws error if not
   *
   * @param fieldName:string
   * @param fieldValue:*
   * @private
   */
  _validateNumberField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'number') throw new Error(`invalid ${fieldName}`)
  },

  /**
   * calls  api
   *
   * @param path:string
   * @param expectedResponse:number
   * @returns {Promise<AxiosResponse<any> | never>}
   * @private
   */
  _apiCall(config, expectedResponse) {
    config.baseURL = this._base
    config.headers = { 'Authorization': `Token ${this._token}`}
    return Promise.resolve(() => {
      this._validateNumberField('expectedResponse', expectedResponse)
    })
      .then(() => axios.request(config))
      .then(response => {
        if (response.status === expectedResponse) {
          console.log('received response', response)
          return response
        } else
          throw new Error(`Bad API call, status = ${response.status}`)
      })
      .catch(error => {
        throw new Error(`Bad API call, error = ${error}`)
      })
  },

  getCustomers() {
    const config = {
      url: '/v1/customers/',
      method: 'GET',
    }
    return this._apiCall(config, 200)
      .then(response => {
        let customers = response.data.customers
        if (customers.length) {
          customers = customers.map(customer => ({
            dirty: false,
            name: customer.name,
            email: customer.email,
            id: customer.id
          }))
        }
        return customers
      })

  },

  /**
   * saves back to DB customers whose data has changed
   * for now it just saves one customer
   *
   * @param dirtyCustomers
   * @returns {Promise<void | never>}
   */
  updateCustomers(dirtyCustomers) {
    let customer, config
    return Promise.resolve()
      .then(() => {
        if (dirtyCustomers.length <= 0) throw new Error('No customers to update')
      })
      .then(() => {
        // let's just assume one for now to make it simple
        customer = dirtyCustomers.pop()
        config = {
          url: `/v1/customers/${customer.id}/fields/name/`,
          data: {"type": "string", "value": customer.name, "extra": {}},
          method: 'PUT'
        }
        return this._apiCall(config, 200)
      })
      .then(() => {
        config.url = `/v1/customers/${customer.id}/fields/email/`
        config.data = {"type": "string", "value": customer.email, "extra": {}}
        return this._apiCall(config, 200)
      })

  }
}


export default logic