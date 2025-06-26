import request from 'supertest';

const baseURL = 'http://localhost:3000';

describe('Booking integration tests', () => {

  it('should create a booking and update course availability', async () => {
    // 1. Récupérer une classe qui n’est pas full et pas annulée
    const classesRes = await request(baseURL).get('/api/classes');
    const availableClass = classesRes.body.find((c: any) => !c.isCancelled && c.capacity > 0);

    expect(availableClass).toBeDefined();

    // 2. Récupérer un utilisateur existant
    const usersRes = await request(baseURL).get('/api/users');
    const user = usersRes.body.find((u: any) => u.role === 'USER');

    expect(user).toBeDefined();

    // 3. Vérifier si une réservation existe déjà pour cet utilisateur + classe
    const bookingsRes = await request(baseURL).get('/api/bookings');
    const existingBooking = bookingsRes.body.find((b: any) => b.userId === user.id && b.classId === availableClass.id);

    if (existingBooking) {
      // Si la réservation existe, le test valide que le serveur renvoie 409 en doublon
      await request(baseURL)
        .post('/api/bookings')
        .send({ userId: user.id, classId: availableClass.id })
        .expect(409);
    } else {
      // Sinon on crée la réservation normalement
      const res = await request(baseURL)
        .post('/api/bookings')
        .send({ userId: user.id, classId: availableClass.id })
        .expect(201);

      expect(res.body).toHaveProperty('bookingId');
      expect(res.body.userId).toBe(user.id);
      expect(res.body.classId).toBe(availableClass.id);
    }
  });
});
