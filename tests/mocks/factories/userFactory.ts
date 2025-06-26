// 📁 tests/mocks/factories/userFactory.ts
export function createUser(overrides = {}) {
  return {
    id: 'user-1',
    email: 'user@example.com',
    role: 'USER',
    subscriptionType: 'STANDARD',
    ...overrides,
  };
}