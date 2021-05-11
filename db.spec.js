const { db } = require('./db')
jest.mock('fs')

const fs = require('fs')

describe('db', () => {
  afterEach(() => {
    fs.clearMockData()
  })

  it('can read', async () => {
    expect(db.read instanceof Function).toBeTruthy()

    const _data = [{ title: 'hi', done: true }]
    fs.setReadFileMock('mock', null, JSON.stringify(_data))
    const list = await db.read('mock')
    expect(list).toStrictEqual(_data)
  })

  it('can write', async () => {
    expect(db.write instanceof Function).toBeTruthy()

    let fakeDate = ''
    fs.setWriteFileMock('writeMock', (_, data, options, callback) => {
      fakeDate = data
    })

    const _data = [{ title: 'write', done: false }]
    await db.write(_data, 'writeMock')
    expect(fakeDate).toBe(JSON.stringify(_data) + '\n')
  })
})
