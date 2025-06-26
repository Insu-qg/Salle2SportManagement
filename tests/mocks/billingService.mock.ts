// 📁 tests/mocks/billingService.mock.ts
import { vi } from 'vitest';

export const billingServiceMock = {
  chargeUser: vi.fn(),
  applyPenalty: vi.fn(),
  generateInvoice: vi.fn(),
};