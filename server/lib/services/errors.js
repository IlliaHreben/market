const ApiError = require('./ApiError')

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

const USER_ERRORS = data => ({
  GUESSABLE_PASSWORD: {
    code   : 'GUESSABLE_PASSWORD',
    fields : {
      confirmPassword: 'GUESSABLE_PASSWORD'
    }
  },
  USER_ALREADY_EXIST: {
    code    : 'ALREADY_EXIST',
    message : `User with this ${data} already exist.`,
    fields  : {
      [data]: 'ALREADY_EXIST'
    }
  },
  MYSELF: {
    code   : 'NOT_ALLOWED',
    fields : {
      user: 'MYSELF'
    }
  },
  AUTHENTICATION_FAILED: {
    code   : 'AUTHENTICATION_FAILED',
    fields : {
      email    : 'INVALID',
      password : 'INVALID'
    }
  },
  WRONG_TOKEN: {
    code   : 'PERMISSION_DENIED',
    fields : {
      token: 'WRONG_TOKEN'
    }
  },
  TOKEN_EXPIRED: {
    code   : 'PERMISSION_DENIED',
    fields : {
      token: 'TOKEN_EXPIRED'
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
      throw new ApiError({
        code   : 'NOT_EXIST',
        fields : {
          [data]: 'NOT_EXIST'
        }
      })
    default:
      if (ERRORS()[type]) {
        throw new ApiError(ERRORS(data)[type])
      }
      throw new ApiError({ code: 'SERVER_ERROR', fields: { type } })
  }
}

module.exports = throwError
