# Mysql Layer

This is a simple wrapper around the nodejs mysql package.

It allows you to establish a connection and then handle asynchronous queries without taking up quite as much space.

## Installation

`npm i --save mysql-layer`

## Usage

`const Connection = new Conn(<args>)`
`Connection.asyncQuery('Some Query ?', [productId]).then(data => console.log(data))`

### Import Package(s)

- `import { Conn } from 'mysql-layer'`
- `import { Pool } from 'mysql-layer'`
- `import Mysql from 'mysql-layer'`

## History

- Initial Commit

## Credits

- Company: ©2019 The Launch
- Author: Daniel Griffiths
- Role: Founder and Engineer
- Project: ©2020 CryptoDock

## License

MIT Licence ©2020 Daniel Griffiths
