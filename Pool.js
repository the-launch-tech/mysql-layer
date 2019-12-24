const MysqlLayer = require('./MysqlLayer')

class Pool extends MysqlLayer {
  constructor(params) {
    super(params)

    super.createPool()
  }

  connectPool = cb => {
    const fn = this.connectPool

    if (cb === undefined) {
      return new Promise((resolve, reject) => {
        fn((connectionError, connection) => {
          if (connectionError) {
            reject(connectionError)
          }
          resolve(connection)
        })
      })
    }

    this.pool.getConnection(cb)
  }

  asyncQuery = (query, bindings = [], cb) => {
    const fn = this.asyncQuery

    const bindingsCBArray = super.checkArgs(bindings, cb)
    bindings = bindingsCBArray[0]
    cb = bindingsCBArray[1]

    if (cb === undefined) {
      return new Promise((resolve, reject) => {
        fn(query, bindings, (queryError, data, release) => {
          if (queryError) reject(queryError)
          resolve(data, release)
        })
      })
    }

    this.pool.getConnection((connectionError, connection) => {
      if (connectionError) reject(connectionError)
      connection.query(query, bindings, (queryError, data) => {
        if (super.isFn(cb)) {
          cb(queryError, data, connection.release)
        } else {
          connection.release()
        }
      })
    })
  }
}

module.exports = Pool
