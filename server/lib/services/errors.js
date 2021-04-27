/* eslint-disable complexity */
const X = require('./ApiError')

const COMMON_ERRORS = (data = '') => ({
  ALREADY_EXIST: {
    code   : 'ALREADY_EXIST',
    fields : {
      [data]: 'ALREADY_EXIST'
    }
  },
  WRONG_ID: {
    code    : 'WRONG_ID',
    message : `${data} with this id not exist`,
    fields  : {
      [data || 'id']: 'WRONG_ID'
    }
  },
  PERMISSION_DENIED: {
    code   : 'PERMISSION_DENIED',
    fields : {
      user: 'PERMISSION_DENIED'
    }
  },
  BROKEN_SIGNATURE: {
    code   : 'NOT_ALLOWED',
    fields : {
      signature: 'BROKEN_SIGNATURE'
    }
  }
})

const USER_ERRORS = () => ({
  GUESSABLE_PASSWORD: {
    code   : 'GUESSABLE_PASSWORD',
    fields : {
      confirmPassword: 'GUESSABLE_PASSWORD'
    }
  },
  MYSELF: {
    code   : 'NOT_ALLOWED',
    fields : {
      user: 'MYSELF'
    }
  }
})

const ERRORS = (data) => ({
  ...COMMON_ERRORS(data),
  ...USER_ERRORS(data)
})

function throwError (type, data) {
  switch (type) {
    case 'NOT_EXIST':
      throw new X({
        code   : 'NOT_EXIST',
        fields : {
          entity: 'NOT_EXIST'
        }
      })
    default:
      if (ERRORS()[type]) {
        throw new X(ERRORS(data)[type])
      }
      throw new X({ code: 'SERVER_ERROR', fields: { type } })
  }
}

module.exports = throwError
