const supertest = require('supertest')
const { getPool } = require('../utils/db')
const db = getPool()
const app = require('../app')
const {
  exampleGroup,
  exampleUser,
  groupsInDb
} = require('./test_helper')

const api = supertest(app)

let token
beforeAll(async () => {
  await db.sync({ force: true })

  const res = await api
    .post('/api/users')
    .send(exampleUser)

  // This works really strangely - instead of the normal request.data
  // it recieves the user info in a string called request.text
  // Maybe Jest is sending special headers for some reason that interfere
  // with normal functionality?
  const user = JSON.parse(res.text)
  token = user.token
})

test('groups are returned as json', async () => {
  await api
    .get('/api/groups/all')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('creating a group', () => {
  test('is successful with valid parameters', async () => {
    await api
      .post('/api/groups')
      .auth(token, { type: 'bearer' })
      .send(exampleGroup)
      .expect(200)

    await api
      .get('/api/groups/all')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const groups = await groupsInDb()
    const titles = groups.map(g => g.bookTitle)
    expect(titles).toContain(exampleGroup.bookTitle)
  })

  test('fails when title is missing', async () => {
    const malformedGroup = {
      'bookAuthor': 'Thomas Pynchon',
      'bookYear': 1973,
      'bookIsbn': '0143039946',
      'bookPageCount': 777
    }

    await api
      .post('/api/groups')
      .auth(token, { type: 'bearer' })
      .send(malformedGroup)
      .expect(400)
  })

  test('fails with invalid ISBN length', async () => {
    const malformedGroup = {
      ...exampleGroup,
      'bookIsbn': '97463657483927865628379'
    }

    await api
      .post('/api/groups')
      .auth(token, { type: 'bearer' })
      .send(malformedGroup)
      .expect(400)
  })

  test('fails with non-numerical ISBN', async () => {
    const malformedGroup = {
      ...exampleGroup,
      'bookIsbn': '0143ABCD46'
    }

    await api
      .post('/api/groups')
      .auth(token, { type: 'bearer' })
      .send(malformedGroup)
      .expect(400)
  })

  test('fails with invalid year', async () => {
    const malformedGroup = {
      ...exampleGroup,
      'bookYear': 19733,
    }

    await api
      .post('/api/groups')
      .auth(token, { type: 'bearer' })
      .send(malformedGroup)
      .expect(400)
  })

  test('fails with missing page count', async () => {
    const malformedGroup = {
      ...exampleGroup,
      'bookPageCount': undefined
    }

    await api
      .post('/api/groups')
      .auth(token, { type: 'bearer' })
      .send(malformedGroup)
      .expect(400)
  })

  test('fails with non-numerical page count', async () => {
    const malformedGroup = {
      ...exampleGroup,
      'bookPageCount': 'over 9000!'
    }

    await api
      .post('/api/groups')
      .auth(token, { type: 'bearer' })
      .send(malformedGroup)
      .expect(400)
  })

  test('adding multiple new groups does not override any existing groups', async () => {
    await api
      .post('/api/groups')
      .auth(token, { type: 'bearer' })
      .send(exampleGroup)
      .expect(200)

    await api
      .post('/api/groups')
      .auth(token, { type: 'bearer' })
      .send(exampleGroup)
      .expect(200)

    await api
      .post('/api/groups')
      .auth(token, { type: 'bearer' })
      .send(exampleGroup)
      .expect(200)

    const groups = await groupsInDb()
    expect(groups).toHaveLength(4)
  })
})

afterAll(async () => {
  await db.close()
})