import request from 'supertest';
import jwt from 'jsonwebtoken';

const baseURL = 'http://localhost:3000';

describe('Dashboard integration tests', () => {
  let token: string;

  beforeAll(() => {
    const mockUser = { id: 1, email: 'admin@gym.com', role: 'ADMIN' };
    token = jwt.sign(mockUser, 'test_secret', { expiresIn: '1h' });
  });

  it('should fetch admin dashboard summary', async () => {
    const res = await request(baseURL)
      .get('/api/dashboard/admin')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // Vérification de la structure reçue
    expect(res.body).toHaveProperty('users.total');
    expect(res.body).toHaveProperty('bookings.total');
    expect(res.body).toHaveProperty('subscriptions');
    expect(res.body).toHaveProperty('revenue.monthly');

    // Vérification des valeurs
    expect(res.body.users.total).toBeGreaterThanOrEqual(3); // au moins admin + 2 users
    expect(res.body.bookings.total).toBeGreaterThanOrEqual(8);
  });
});
