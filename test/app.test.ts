import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import { _DB_TEST_CONNECTION_STRING } from '../src/config/constants';
describe('User API Endpoints', () => {
  before(async () => {
    await mongoose.disconnect();
    await mongoose.connect(`${_DB_TEST_CONNECTION_STRING}?retryWrites=true&w=majority`);
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });
 

  after(async () => {
    await mongoose.disconnect();
  });

  describe('POST /users', () => {
    let userId: string;
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          email: 'emtest@example.com',
          firstName: 'TestUser',
          lastName: 'TestUser',
        });
      userId = response.body.user._id;
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('message').to.equal('User created successfully');
      expect(response.body.user).to.have.property('email').to.equal('emtest@example.com');
      expect(response.body.user).to.have.property('firstName').to.equal('TestUser');
      const response2 = await request(app).delete(`/users/${userId}`);
    });

    it('should return validation error for an invalid user', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          // Invalid user data
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('errors');
    });
  });

  describe('PUT /users/:id', () => {
    let userId: string;

    before(async () => {
      const createUserResponse = await request(app)
        .post('/users')
        .send({
          email: 'updateTestUser@example.com',
          firstName: 'TestUser',
          lastName: 'TestUser',
        });      
      userId = createUserResponse.body.user._id;
    });
  
    it('should update an existing user', async () => {

      const response = await request(app)
        .put(`/users/${userId}`)
        .send({
          firstName: 'UpdatedTestUser',
        });
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('message').to.equal('User updated successfully');
      expect(response.body.user).to.have.property('firstName').to.equal('UpdatedTestUser');
    });

    it('should return validation error for an invalid update', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .send({
         email:"abcd"
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('errors');
    });

    it('should return 404 for updating a non-existent user', async () => {
      const response = await request(app)
        .put('/users/123')
        .send({
          firstName: 'UpdatedTestUser',
        });
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('message').to.equal('User not found');
    });
  });

  describe('DELETE /users/:id', () => {
    let userId: string;

    before(async () => {
      const createUserResponse = await request(app)
        .post('/users')
        .send({
          email: 'deleteTestUser@example.com',
          firstName: 'TestUser',
          lastName: 'TestUser',
        });
      userId = createUserResponse.body.user._id;
    });

    it('should delete an existing user', async () => {
      const response = await request(app).delete(`/users/${userId}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('message').to.equal('User deleted successfully');
    });

    it('should return 404 for deleting a non-existent user', async () => {
      const response = await request(app).delete('/users/nonexistentuserid');
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('message').to.equal('User not found');
    });
  });
});