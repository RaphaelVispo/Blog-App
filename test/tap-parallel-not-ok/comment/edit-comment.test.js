import tap from 'tap';
import { build } from '../../../src/app.js';
import 'must/register.js';
import Chance from 'chance';

const chance = new Chance();
tap.mochaGlobals();

const prefix = '/api';

describe('Update a Blog should work', async () => {
  let app;

  const newUser = {
    username: chance.email({ domain: 'example.com' }),
    password: chance.string({ length: 12 }),
    firstName: chance.first(),
    lastName: chance.last()
  };

  let cookie = '';

  before(async () => {
    app = await build({
      forceCloseConnections: true
    });
  });

  it('it should return an error when the user is not yet logged in', async () => {
    const newComment = {
      message: 'comment'
    };

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/11e89109-9868-41e8-a9c0-ff503a02e7a8/comment/5790821e-8592-470c-955e-8cc1e54bee98`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newComment)
    });

    // must be a bad request
    // console.log(await response.json());
    response.statusCode.must.be.equal(401);
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
    // console.log(cookie);
  });

  it('Should update the object given an ID', async () => {
    const newComment = {
      message: 'comment'
    };

    const newerComment = {
      message: 'Edited comment'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/blog/11e89109-9868-41e8-a9c0-ff503a02e7a8/comment`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newComment)
    });
    // console.log(await createResponse.json().id);

    const { id, createdDate, updatedDate } = await createResponse.json();
    // console.log(`\n\n${blogId}\n\n`);

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/11e89109-9868-41e8-a9c0-ff503a02e7a8/comment/${id}`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newerComment)
    });

    // this checks if HTTP status code is equal to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    result.message.must.be.equal(newerComment.message);

    // expect createdDate and updatedDate is not null
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
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

  it('it should return an error when the user is not yet logged in', async () => {
    const newComment = {
      message: 'comment'
    };

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/blog/11e89109-9868-41e8-a9c0-ff503a02e7a8/comment/5790821e-8592-470c-955e-8cc1e54bee98`,
      headers: {
        'Content-Type': 'application/json',
        cookie
      },
      body: JSON.stringify(newComment)
    });

    // must be a bad request
    // console.log(response);
    response.statusMessage.must.be.equal('Forbidden');
  });

  after(async () => {
    await app.close();
  });
});
