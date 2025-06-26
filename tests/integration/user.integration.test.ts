import request from 'supertest';
const baseURL = 'http://localhost:3000';

describe('User integration tests', () => {

  it('should fetch users list', async () => {
    const res = await request(baseURL)
      .get('/api/users')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should create a new user if not exist', async () => {
    const email = 'integration.user@test.com';

    // Check if user exists
    const usersRes = await request(baseURL).get('/api/users');
    const existingUser = usersRes.body.find((u: any) => u.email === email);

    if (existingUser) {
      // User exists, test duplicate creation returns conflict
      await request(baseURL)
        .post('/api/users')
        .send({
          firstname: 'Test',
          lastname: 'User',
          email,
          role: 'USER'
        })
        .expect(409);
    } else {
      // Create new user
      const res = await request(baseURL)
        .post('/api/users')
        .send({
          firstname: 'Test',
          lastname: 'User',
          email,
          role: 'USER'
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.email).toBe(email);
    }
  });

});
