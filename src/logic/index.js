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
    return Promise.resolve(() => {
      this._validateNumberField('expectedResponse', expectedResponse)
    })
      .then(() => axios.request(config))
      .then(response => {
        if (response.status === expectedResponse) {
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
      baseURL: this._base,
      headers: {
        'Authorization': `Token ${this._token}`
      },
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

  updateCustomers(dirtyCustomers) {
    if (dirtyCustomers.length > 0) {
      console.log('dirty customers',dirtyCustomers.length)
    }
  }


}


export default logic