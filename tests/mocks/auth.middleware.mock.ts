// 📁 tests/mocks/auth.middleware.mock.ts
import { vi } from 'vitest';

export const isAuthenticated = vi.fn((req, res, next) => {
  req.user = { id: 'mock-user-id', role: 'USER' };
  next();
});

export const hasRole = (role) =>
  vi.fn((req, res, next) => {
    req.user = { id: 'mock-user-id', role };
    next();
  });