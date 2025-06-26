import { describe, it, expect } from 'vitest';
import bookingService from '../../backend/src/services/bookingService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let fullClass: Class;
let users: User[];

beforeEach(async () => {
  fullClass = await prisma.class.findFirstOrThrow({
    where: { title: 'Pilates Débutant' },
  });

  // Prendre assez d’utilisateurs (capacité + 1)
  users = await prisma.user.findMany({
    take: fullClass.capacity + 1,
  });

  await prisma.booking.deleteMany({
    where: { classId: fullClass.id },
  });

  for (let i = 0; i < fullClass.capacity; i++) {
    await prisma.booking.create({
      data: {
        classId: fullClass.id,
        userId: users[i].id,
        status: 'CONFIRMED',
      },
    });
  }
});




describe('BookingService.createBooking - integration', () => {
  beforeEach(async () => {
  // Trouver le cours "Zumba Party"
  const zumbaClass = await prisma.class.findFirst({
    where: { title: 'Zumba Party' },
  });

  if (zumbaClass) {
    // Supprimer toutes les réservations sur ce cours
    await prisma.booking.deleteMany({
      where: { classId: zumbaClass.id },
    });
  }
});
  it('devrait créer une réservation valide pour un cours libre', async () => {
    const user = await prisma.user.findFirst({ where: { email: 'marie.dupont@email.com' } });
    if (!user) throw new Error('User Marie Dupont not found in DB');

    const course = await prisma.class.findFirst({
      where: {
        title: 'Zumba Party',
        bookings: { none: { userId: user.id } },
        isCancelled: false,
      }
    });
    if (!course) throw new Error('Course Zumba Party not found or already booked');

    const booking = await bookingService.createBooking({
      userId: user.id,
      classId: course.id
    });

    expect(booking).toMatchObject({
      userId: user.id,
      classId: course.id,
      status: 'CONFIRMED'
    });
  });
});




it('devrait échouer si la classe est annulée', async () => {
  const user = await prisma.user.findFirst({ where: { email: 'marie.dupont@email.com' } });
  const cancelledClass = await prisma.class.findFirst({ where: { isCancelled: true } });

  await expect(bookingService.createBooking({
    userId: user!.id,
    classId: cancelledClass!.id
  })).rejects.toThrow('Class is cancelled');
});






it('devrait échouer si la classe est pleine', async () => {
  const confirmedBookingsCount = await prisma.booking.count({
    where: { classId: fullClass.id, status: 'CONFIRMED' },
  });
  expect(confirmedBookingsCount).toBe(fullClass.capacity);

  await expect(
    bookingService.createBooking({
      classId: fullClass.id,
      userId: users[fullClass.capacity].id, // utilisateur supplémentaire OK
    })
  ).rejects.toThrow('Class is full');
});

it('devrait échouer si l\'utilisateur a déjà une réservation au même horaire', async () => {
  const user = await prisma.user.findFirst({ where: { email: 'marie.dupont@email.com' } });
  const existingBooking = await prisma.booking.findFirst({
    where: { userId: user!.id, status: 'CONFIRMED' },
    include: { class: true }
  });

  // Crée un cours fictif avec le même datetime
  const conflictingClass = await prisma.class.create({
    data: {
      title: 'Conflit Test',
      coach: 'Test Coach',
      datetime: existingBooking!.class.datetime,
      duration: 60,
      capacity: 10,
      isCancelled: false
    }
  });

  await expect(bookingService.createBooking({
    userId: user!.id,
    classId: conflictingClass.id
  })).rejects.toThrow('User already has a booking at this time slot');
});

describe('BookingService.cancelBooking - integration', () => {
  it('devrait annuler une réservation si plus de 2h avant le cours', async () => {
    const user = await prisma.user.findFirst({ where: { email: 'marie.dupont@email.com' } });
    const course = await prisma.class.create({
      data: {
        title: 'Cours Annulable',
        coach: 'Coach Test',
        datetime: new Date(Date.now() + 3 * 3600000),
        duration: 60,
        capacity: 10,
        isCancelled: false
      }
    });

    const booking = await prisma.booking.create({
      data: {
        userId: user!.id,
        classId: course.id,
        status: 'CONFIRMED'
      }
    });

    const result = await bookingService.cancelBooking(booking.id, user!.id);
    expect(result.status).toBe('CANCELLED');
  });
});
