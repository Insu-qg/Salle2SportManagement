// test/__mocks__/prismaClient.ts
import { vi } from 'vitest';

const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  // Ajoute d'autres modèles selon tes besoins
  booking: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  // etc.
};

export default mockPrisma;
