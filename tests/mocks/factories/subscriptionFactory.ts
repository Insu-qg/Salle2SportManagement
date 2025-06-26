// 📁 tests/mocks/factories/subscriptionFactory.ts
export function createSubscription(overrides = {}) {
  return {
    id: 'sub-1',
    userId: 'user-1',
    type: 'STANDARD',
    status: 'ACTIVE',
    startDate: new Date(),
    ...overrides,
  };
}