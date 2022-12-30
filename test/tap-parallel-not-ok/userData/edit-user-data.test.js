import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();

tap.mochaGlobals();

const prefix = '/api';

describe('Get a blog should work', async () => {
  let app;

  before(async () => {
    app = await build({
      forceCloseConnections: true
    });
  });

  const newUser = {
    username: chance.email({ domain: 'example.com' }),
    password: chance.string({ length: 12 }),
    firstName: chance.first(),
    lastName: chance.last()
  };

  let cookie = '';

  it('it should return an error when the user is not yet logged in', async () => {
    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/user/rapVispo`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify({
        firstName: 'random firstname',
        lastName: 'random lastname'
      })

    });

    // must be a bad request
    response.statusCode.must.be.equal(401);
    response.statusMessage.must.be.equal('Unauthorized');
  });

  it('Should return the user that was created a new user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/register`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.username.must.be.equal(newUser.username);
    result.firstName.must.be.equal(newUser.firstName);
    result.lastName.must.be.equal(newUser.lastName);

    // expect createdDate and updatedDate is not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });

  it('Login should work', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password
      })
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    cookie = response.headers['set-cookie'];
  });

  // Start test here
  it('Should return the object given an ID', async () => {
    const changeUserData = {
      firstName: 'Edit firstname',
      lastName: 'edit lastname'
    };

    const createResponse = await app.inject({
      method: 'PUT',
      url: `${prefix}/user/${newUser.username}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(changeUserData)
    });
    // console.log(createResponse);

    // this checks if HTTP status code is equal to 200
    createResponse.statusCode.must.be.equal(200);

    const result = await createResponse.json();

    // expect that all of the values should be equal to newTodo properties
    result.username.must.be.equal(newUser.username);
    result.firstName.must.be.equal(changeUserData.firstName);
    result.lastName.must.be.equal(changeUserData.lastName);

    result.updatedDate.must.above(result.createdDate);
  });

  it('Logout should work', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/logout`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      }
    });

    // this checks if HTTP status code is equal to 401
    response.statusCode.must.be.equal(200);
  });

  it('Login should work', async () => {
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'user1',
        password: 'password123'
      })
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    cookie = response.headers['set-cookie'];
  });

  it('Should return the object given an ID', async () => {
    const changeUserData = {
      firstName: 'Edit firstname',
      lastName: 'edit lastname'
    };

    const createResponse = await app.inject({
      method: 'PUT',
      url: `${prefix}/user/${newUser.username}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(changeUserData)
    });
    // console.log(createResponse);

    // this checks if HTTP status code is equal to 200
    createResponse.statusCode.must.be.equal(403);
  });

  after(async () => {
    await app.close();
  });
});
