import { describe, it, expect } from 'vitest';
import dashboardService from '../../backend/src/services/dashboardService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('DashboardService', () => {
  it('should return a valid user dashboard', async () => {
    const user = await prisma.user.findFirst({
      where: { email: 'marie.dupont@email.com' },
      include: { bookings: { include: { class: true } }, subscription: true }
    });
    if (!user) throw new Error('User not found');

    const dashboard = await dashboardService.getUserDashboard(user.id);

    expect(dashboard.user.email).toBe(user.email);
    expect(dashboard.stats).toHaveProperty('totalClasses');
    expect(dashboard.billing).toHaveProperty('monthlyAmount');
    expect(Array.isArray(dashboard.recentBookings)).toBe(true);
  });

  it('should return a valid admin dashboard', async () => {
    const dashboard = await dashboardService.getAdminDashboard();

    expect(dashboard.users).toHaveProperty('total');
    expect(dashboard.bookings).toHaveProperty('confirmed');
    expect(dashboard.revenue).toHaveProperty('monthly');
    expect(dashboard.subscriptions).toHaveProperty('STANDARD');
  });
});
