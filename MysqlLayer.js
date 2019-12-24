const mysql = require('mysql')

class MysqlLayer {
  constructor(params) {
    this.connection = false
    this.pool = false
    this.params = params
  }

  createConnection() {
    this.connection = mysql.createConnection(this.params)
  }

  createPool() {
    this.pool = mysql.createPool(this.params)
  }

  pool() {
    return this.pool
  }

  connection() {
    return this.connection
  }

  checkArgs(bindings, cb) {
    return this.isFn(bindings) ? [[], bindings] : [bindings, cb]
  }

  isFn(arg) {
    return typeof arg === 'function'
  }
}

module.exports = MysqlLayer
