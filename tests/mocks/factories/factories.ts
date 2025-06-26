// tests/mocks/factories.ts
import { faker } from '@faker-js/faker';

export function makeFakeUser(overrides = {}) {
  return {
    id: faker.string.uuid(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['USER', 'ADMIN']),
    dateJoined: faker.date.past().toISOString(),
    isActive: true,
    // Ajout pour correspondre à votre modèle
    subscription: null,
    bookings: [],
    ...overrides,
  };
}

export function makeFakeClass(overrides = {}) {
  return {
    id: faker.string.uuid(),
    title: faker.word.words(2),
    coach: faker.person.fullName(),
    capacity: faker.number.int({ min: 5, max: 30 }),
    datetime: faker.date.future().toISOString(),
    duration: faker.number.int({ min: 30, max: 90 }),
    isCancelled: false,
    // Ajout des relations
    bookings: [],
    ...overrides,
  };
}

export function makeFakeBooking(overrides = {}) {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    classId: faker.string.uuid(),
    status: faker.helpers.arrayElement(['CONFIRMED', 'CANCELLED', 'NO_SHOW']),
    createdAt: faker.date.past().toISOString(),
    // Relations pour les tests
    user: null,
    class: null,
    ...overrides,
  };
}

export function makeFakeSubscription(overrides = {}) {
  const now = new Date();
  const startDate = faker.date.past();
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 12);

  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    planType: faker.helpers.arrayElement(['STANDARD', 'PREMIUM', 'ETUDIANT']),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    active: true,
    autoRenew: faker.datatype.boolean(),
    ...overrides,
  };
}

// Factory pour créer des objets liés
export function makeFakeUserWithSubscription(userOverrides = {}, subscriptionOverrides = {}) {
  const user = makeFakeUser(userOverrides);
  const subscription = makeFakeSubscription({ 
    userId: user.id, 
    ...subscriptionOverrides 
  });
  
  return {
    ...user,
    subscription
  };
}

export function makeFakeBookingWithRelations(bookingOverrides = {}, userOverrides = {}, classOverrides = {}) {
  const user = makeFakeUser(userOverrides);
  const classItem = makeFakeClass(classOverrides);
  const booking = makeFakeBooking({
    userId: user.id,
    classId: classItem.id,
    user,
    class: classItem,
    ...bookingOverrides
  });
  
  return booking;
}

// Helper pour générer des données de test spécifiques
export function makeFakeClassWithBookings(classOverrides = {}, bookingCount = 3) {
  const classItem = makeFakeClass(classOverrides);
  const bookings = Array.from({ length: bookingCount }, () =>
    makeFakeBooking({ classId: classItem.id })
  );
  
  return {
    ...classItem,
    bookings
  };
}