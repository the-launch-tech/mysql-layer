const MysqlLayer = require('./MysqlLayer')

class Conn extends MysqlLayer {
  constructor(params = {}) {
    super(params)

    this.end = this.end.bind(this)
    this.asyncQuery = this.asyncQuery.bind(this)

    super.createConnection()
  }

  end(cb) {
    const fn = this.end

    if (cb === undefined) {
      return new Promise((resolve, reject) => {
        fn((err, state) => {
          if (err) reject(err)
          resolve(state)
        })
      })
    }

    if (super.getConnection().state === 'disconeccted') {
      return cb('Connection Already Disconnected', super.getConnection().state)
    } else {
      super.getConnection().end()
    }

    return cb(false, super.getConnection().state)
  }

  asyncQuery(query, bindings, cb) {
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

    super.getConnection().query(query, bindings, cb)
  }
}

module.exports = Conn
