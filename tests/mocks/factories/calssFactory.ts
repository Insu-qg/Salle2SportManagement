// 📁 tests/mocks/factories/classFactory.ts
export function createClass(overrides = {}) {
  return {
    id: 'class-1',
    title: 'Yoga',
    capacity: 20,
    startTime: new Date(Date.now() + 3600 * 1000),
    ...overrides,
  };
}