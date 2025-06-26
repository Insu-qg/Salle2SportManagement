import request from 'supertest';
const baseURL = 'http://localhost:3000';

describe('Subscription integration tests', () => {

  it('should fetch subscriptions list', async () => {
    const res = await request(baseURL)
      .get('/api/subscriptions')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create subscription for existing user if not exist', async () => {
    // Get user
    const usersRes = await request(baseURL).get('/api/users');
    const user = usersRes.body.find((u: any) => u.role === 'USER');
    expect(user).toBeDefined();

    const planType = 'PREMIUM';

    // Check if subscription exists for user & planType
    const subscriptionsRes = await request(baseURL).get('/api/subscriptions');
    const existingSubscription = subscriptionsRes.body.find((s: any) => s.userId === user.id && s.planType === planType);

    if (existingSubscription) {
      // Duplicate subscription should return conflict
      await request(baseURL)
        .post('/api/subscriptions')
        .send({
          userId: user.id,
          planType,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
          autoRenew: true,
          active: true
        })
        .expect(409);
    } else {
      const res = await request(baseURL)
        .post('/api/subscriptions')
        .send({
          userId: user.id,
          planType,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
          autoRenew: true,
          active: true
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.userId).toBe(user.id);
      expect(res.body.planType).toBe(planType);
    }
  });

});
