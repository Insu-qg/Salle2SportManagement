// tests/mocks/services.mock.ts
import { vi } from 'vitest';

export const mockUserService = {
  getAllUsers: vi.fn(),
  getUserById: vi.fn(),
  getUserByEmail: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
};

export const mockClassService = {
  getAllClasses: vi.fn(),
  getClassById: vi.fn(),
  createClass: vi.fn(),
  updateClass: vi.fn(),
  deleteClass: vi.fn(),
  purgeOldClasses: vi.fn(),
  isClassFull: vi.fn(),
  isClassCancelled: vi.fn(),
  canBookClass: vi.fn(),
};

export const mockBookingService = {
  getAllBookings: vi.fn(),
  getBookingById: vi.fn(),
  getBookingsByUserId: vi.fn(),
  getBookingsByClassId: vi.fn(),
  createBooking: vi.fn(),
  cancelBooking: vi.fn(),
  updateBookingStatus: vi.fn(),
  deleteBooking: vi.fn(),
  updateNoShowBookings: vi.fn(),
  getUserBookingStats: vi.fn(),
  getMonthlyNoShowCount: vi.fn(),
};

export const mockSubscriptionService = {
  getAllSubscriptions: vi.fn(),
  getSubscriptionById: vi.fn(),
  getSubscriptionByUserId: vi.fn(),
  createSubscription: vi.fn(),
  updateSubscription: vi.fn(),
  deleteSubscription: vi.fn(),
  getSubscriptionPrice: vi.fn(),
  calculateMonthlyBilling: vi.fn(),
};
