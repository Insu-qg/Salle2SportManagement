// tests/mocks/factories.ts

import { faker } from '@faker-js/faker';

export function makeFakeUser(overrides = {}) {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    role: 'USER',
    isActive: true,
    ...overrides,
  };
}

export function makeFakeBooking(overrides = {}) {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    classId: faker.string.uuid(),
    date: new Date().toISOString(),
    ...overrides,
  };
}

export function makeFakeClass(overrides = {}) {
  return {
    id: faker.string.uuid(),
    name: faker.word.words(2),
    instructor: faker.person.fullName(),
    capacity: faker.number.int({ min: 5, max: 30 }),
    schedule: faker.date.soon().toISOString(),
    durationMinutes: faker.number.int({ min: 30, max: 90 }),
    ...overrides,
  };
}

export function makeFakeSubscription(overrides = {}) {
  const now = new Date();
  const endsAt = new Date(now);
  endsAt.setMonth(now.getMonth() + 1);

  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    type: faker.helpers.arrayElement(['BASIC', 'PREMIUM']),
    startsAt: now.toISOString(),
    endsAt: endsAt.toISOString(),
    isActive: true,
    ...overrides,
  };
}
