const mysql = require('mysql')

class MysqlLayer {
  constructor(params = {}) {
    this.mysql = mysql
    this.params = params
    this.pool = false
    this.connection = false

    this.checkArgs = this.checkArgs.bind(this)
    this.isFn = this.isFn.bind(this)
    this.createConnection = this.createConnection.bind(this)
    this.createPool = this.createPool.bind(this)
    this.getPool = this.getPool.bind(this)
    this.getConnection = this.getConnection.bind(this)
  }

  checkArgs(bindings, cb) {
    return this.isFn(bindings) ? [[], bindings] : [bindings, cb]
  }

  isFn(arg) {
    return typeof arg === 'function'
  }

  createConnection() {
    this.connection = this.mysql.createConnection(this.params)
  }

  createPool() {
    this.pool = this.mysql.createPool(this.params)
  }

  getPool() {
    return this.pool
  }

  getConnection() {
    return this.connection
  }
}

module.exports = MysqlLayer
