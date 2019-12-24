const MysqlLayer = require('./MysqlLayer')

class Conn extends MysqlLayer {
  constructor(params) {
    super(params)

    super.createConnection()
  }

  end = cb => {
    const fn = this.end

    if (cb === undefined) {
      return new Promise((resolve, reject) => {
        fn((err, state) => {
          if (err) reject(err)
          resolve(state)
        })
      })
    }

    if (this.connection.state === 'disconeccted') {
      return cb('Connection Already Disconnected', this.connection.state)
    } else {
      this.connection.end()
    }

    return cb(false, this.connection.state)
  }

  asyncQuery = (query, bindings, cb) => {
    const fn = this.asyncQuery

    const bindingsCBArray = super.checkArgs(bindings, cb)
    bindings = bindingsCBArray[0]
    cb = bindingsCBArray[1]

    if (cb === undefined) {
      return new Promise((resolve, reject) => {
        fn(query, bindings, (err, results, fields) => {
          if (err) reject(err)
          resolve({ results, fields })
        })
      })
    }

    this.connection.query(query, bindings, cb)
  }
}

module.exports = Conn
