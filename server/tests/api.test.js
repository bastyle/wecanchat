const request = require('supertest');
const app = require('../index'); // Import your Express app

describe('API Health endpoint', () => {
  it('should check the health endpoint', async () => {
    const res = await request(app)
      .get('/api/health');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg', 'OK');
  }, 10000);
});

describe('API Users Routes', () => {
  it('should check the getAllUsers endpoint', async () => {
    const res = await request(app)
      .get('/api/auth/allusers');
    expect(res.statusCode).toEqual(200);
  });

  it('should check the login endpoint', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testUser',
        password: 'test1234'
      });
    expect(res.statusCode).toEqual(200);
    //console.log(res.body);
    expect(res.body).toHaveProperty('status', true);
  });

  it('should check incorrect login endpoint', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'xxx',
        password: 'xxx'
      });
    expect(res.statusCode).toEqual(200);
    //console.log(res.body);
    expect(res.body).toHaveProperty('status', false);
  });

  it('should check the logout endpoint', async () => {
    const res = await request(app)
      .get('/api/auth/logout/123456')
      .send({
        username: 'testUser'
      });
    //console.log(res.body);
    expect(res.statusCode).toEqual(200);
  });


  it('should check the register endpoint', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testUser',
        email: 'testUser.bastias@gmail.com',
        password: 'test1234',
      });
    expect(res.statusCode).toEqual(200);
    //console.log(res.body);
    expect(res.body).toHaveProperty('status', false);
    expect(res.body).toHaveProperty('msg', "username or email already exists");
  });

  it('should get user details', async () => {
    const userId = '123456'; 
    const res = await request(app)
      .get(`/api/auth/user/${userId}`);
    console.log(res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('msg', "Invalid user ID");
  });

});