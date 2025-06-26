// tests/mocks/auth.middleware.mock.ts
import { vi } from 'vitest';

export const isAuthenticated = vi.fn((req, res, next) => {
  req.user = { id: 'mock-user-id', role: 'USER' };
  next();
});

export const hasRole = (role: string) =>
  vi.fn((req, res, next) => {
    req.user = { id: 'mock-user-id', role };
    next();
  });

// Helper pour créer un mock d'utilisateur spécifique
export const mockAuthenticatedUser = (user = { id: 'mock-user-id', role: 'USER' }) =>
  vi.fn((req, res, next) => {
    req.user = user;
    next();
  });
