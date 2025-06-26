// tests/mocks/repositories.mock.ts
import { vi } from 'vitest';

export const mockUserRepository = {
  findAll: vi.fn(),
  findById: vi.fn(),
  findByEmail: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const mockBookingRepository = {
  findAll: vi.fn(),
  findById: vi.fn(),
  findByUserId: vi.fn(),
  findByClassId: vi.fn(),
  findByUserAndClass: vi.fn(),
  findUserBookingsInTimeSlot: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  updateStatus: vi.fn(),
  delete: vi.fn(),
  updateNoShowBookings: vi.fn(),
};

export const mockClassRepository = {
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  findOldClasses: vi.fn(),
  deleteOldClasses: vi.fn(),
};

export const mockSubscriptionRepository = {
  findAll: vi.fn(),
  findById: vi.fn(),
  findByUserId: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

