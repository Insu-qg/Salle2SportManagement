import { describe, it, expect, beforeEach } from 'vitest';
import subscriptionService from '../../backend/src/services/subscriptionService';
import userService from '../../backend/src/services/userService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('SubscriptionService', () => {
  let testUser: any;

  beforeEach(async () => {
    // Nettoyage
    await prisma.subscription.deleteMany();
    await prisma.user.deleteMany({ where: { email: 'test.user@email.com' } });

    // Création d’un utilisateur test
    testUser = await userService.createUser({
      firstname: 'Test',
      lastname: 'User',
      email: 'test.user@email.com',
      role: 'USER'
    });
  });

  it('devrait créer une subscription pour un utilisateur sans abonnement existant', async () => {
    const subscriptionData = {
      userId: testUser.id, // <-- Utiliser l'id dynamique créé dans beforeEach
      planType: 'STANDARD',
      startDate: new Date('2025-06-26T13:43:33.430Z'),
      endDate: new Date('2026-06-26T13:43:33.430Z')
    };

    const createdSubscription = await subscriptionService.createSubscription(subscriptionData);
    expect(createdSubscription).toHaveProperty('id');
    expect(createdSubscription.userId).toBe(testUser.id);
  });

  it('devrait échouer si l’utilisateur a déjà une subscription', async () => {
    // Créer une subscription pour le testUser avant le test
    await subscriptionService.createSubscription({
      userId: testUser.id,
      planType: 'PREMIUM',
      startDate: new Date('2025-06-26T13:43:33.476Z'),
      endDate: new Date('2026-06-26T13:43:33.476Z')
    });

    const subscriptionData = {
      userId: testUser.id, // Utiliser l'id dynamique
      planType: 'PREMIUM',
      startDate: new Date('2025-06-26T13:43:33.476Z'),
      endDate: new Date('2026-06-26T13:43:33.476Z')
    };

    await expect(subscriptionService.createSubscription(subscriptionData)).rejects.toThrow('User already has a subscription');
  });

  // Tes autres tests restent inchangés
  it('devrait calculer correctement le montant mensuel de base', () => {
    const subscription = {
      planType: 'ETUDIANT',
      startDate: new Date()
    };
    const price = subscriptionService.calculateMonthlyBilling(subscription);
    expect(price).toBe(29.99);
  });

  it('devrait appliquer une réduction après 6 mois', () => {
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 7);

    const subscription = {
      planType: 'PREMIUM',
      startDate: pastDate
    };
    const price = subscriptionService.calculateMonthlyBilling(subscription);
    expect(price).toBeCloseTo(53.99); // 59.99 * 0.9
  });

  it('devrait majorer en cas de no-shows excessifs', () => {
    const subscription = {
      planType: 'STANDARD',
      startDate: new Date()
    };
    const price = subscriptionService.calculateMonthlyBilling(subscription, 6);
    expect(price).toBeCloseTo(45.99); // 39.99 * 1.15
  });

  it('devrait appliquer réduction et majoration combinées', () => {
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 8);

    const subscription = {
      planType: 'ETUDIANT',
      startDate: pastDate
    };
    const price = subscriptionService.calculateMonthlyBilling(subscription, 7);
    expect(price).toBeCloseTo(29.99 * 0.9 * 1.15, 2);
  });
});
