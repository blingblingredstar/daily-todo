const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let mockDataRead = {}

fs.setReadFileMock = (path = '', error = null, data = '[]') => {
  mockDataRead[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
  if (callback === undefined) {
    callback = options
  }

  if (path in mockDataRead) {
    const [error, data] = mockDataRead[path]
    callback(error, data)
    return
  }

  _fs.readFile(path, options, callback)
}

let mockDataWrite = {}

fs.setWriteFileMock = (path, callback) => {
  mockDataWrite[path] = callback
}

fs.writeFile = (path, data, options, callback) => {
  if (callback === undefined) {
    callback = options
  }

  if (path in mockDataWrite) {
    mockDataWrite[path](path, data, options, callback)
    callback()
    return
  }

  _fs.writeFile(path, options, callback)
}

fs.clearMockData = () => {
  mockDataRead = {}
  mockDataWrite = {}
}

module.exports = fs
