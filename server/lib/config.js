module.exports = {
  db: {
    user       : process.env.MYSQL_USER,
    host       : process.env.APP_DB_HOST,
    password   : process.env.MYSQL_PASSWORD,
    name       : process.env.MYSQL_DATABASE,
    port       : process.env.APP_DB_PORT,
    logging    : process.env.APP_DB_LOGGING === 'true',
    forceReset : process.env.APP_DB_FORCE_RESET === 'true'
  },
  app: {
    port: process.env.APP_PORT || process.env.PORT
  },
  auth: {
    secret        : process.env.SECRET,
    tokenExpire   : process.env.TOKEN_EXPIRE,
    sessionExpire : process.env.SESSION_EXPIRE
  }
}
