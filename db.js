const home = process.env.HOME || require('os').homedir()
const fs = require('fs')
const path = require('path')
const dbPath = path.join(home, '.todo')

module.exports.db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (err, data) => {
        let list = []
        if (err) {
          return reject(err)
        }

        try {
          list = JSON.parse(data.toString())
        } catch (e) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list = [], path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(list) + '\n', {}, (writeError) => {
        if (writeError) {
          return reject(writeError)
        }
        resolve()
      })
    })
  },
}
