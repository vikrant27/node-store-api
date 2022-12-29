


// class CustomAPIError extends Error {
//     constructor(message,statuscode){
//         super(message)
//         this.statuscode = statuscode
//     }
// }

// // const createCustomerError = (msg, statuscode) => {
// //     return new CustomAPIError(msg, statuscode)
// // }

// module.exports = {CustomAPIError}

class CustomAPIError extends Error {
    constructor(message, statusCode) {
      super(message)
      //this.statusCode = statusCode
    }
  }
  
  module.exports = CustomAPIError