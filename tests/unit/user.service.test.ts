import { describe, it, expect, beforeEach } from 'vitest';
import userService from '../../backend/src/services/userService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('UserService', () => {
  let testUser: any;

  beforeEach(async () => {
    // Nettoyage si déjà existant
    await prisma.user.deleteMany({ where: { email: 'test.user@email.com' } });

    // Création d’un utilisateur test
    testUser = await userService.createUser({
      firstname: 'Test',
      lastname: 'User',
      email: 'test.user@email.com',
      role: 'USER'
    });
  });

  it('devrait récupérer un utilisateur par ID', async () => {
    const user = await userService.getUserById(testUser.id);
    expect(user.email).toBe('test.user@email.com');
  });

  it('devrait récupérer un utilisateur par email', async () => {
    const user = await userService.getUserByEmail('test.user@email.com');
    expect(user?.id).toBe(testUser.id);
  });

  it('devrait empêcher la création d’un utilisateur avec un email déjà utilisé', async () => {
    await expect(userService.createUser({
      firstname: 'Duplication',
      lastname: 'Test',
      email: 'test.user@email.com',
      role: 'USER'
    })).rejects.toThrow('User with this email already exists');
  });

  it('devrait mettre à jour le profil utilisateur', async () => {
    const updated = await userService.updateUser(testUser.id, {
      firstname: 'Updated',
      lastname: 'Name'
    });
    expect(updated.firstname).toBe('Updated');
    expect(updated.lastname).toBe('Name');
  });

  it('devrait empêcher de changer l’email vers un déjà existant', async () => {
    // Créer un autre utilisateur
    const other = await userService.createUser({
      firstname: 'Other',
      lastname: 'User',
      email: 'other@email.com',
      role: 'USER'
    });

    await expect(userService.updateUser(other.id, {
      email: 'test.user@email.com'
    })).rejects.toThrow('User with this email already exists');
  });

  it('devrait supprimer un utilisateur existant', async () => {
    const deleted = await userService.deleteUser(testUser.id);
    expect(deleted).toHaveProperty('id', testUser.id);
    await expect(userService.getUserById(testUser.id)).rejects.toThrow('User not found');
  });
});
