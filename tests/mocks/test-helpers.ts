// tests/utils/test-helpers.ts
import { vi } from 'vitest';

// Reset tous les mocks
export function resetAllMocks() {
  vi.clearAllMocks();
}

// Helper pour créer des erreurs standardisées
export function mockRepositoryError(message: string) {
  return vi.fn().mockRejectedValue(new Error(message));
}

// Helper pour mock des réponses Express
export function mockExpressResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };
}

export function mockExpressRequest(overrides = {}) {
  return {
    params: {},
    body: {},
    query: {},
    user: null,
    ...overrides,
  };
}

// Helper pour les tests d'intégration
export function setupTestDatabase() {
  // Configuration pour base de test
  return {
    cleanup: vi.fn(),
    seed: vi.fn(),
  };
}