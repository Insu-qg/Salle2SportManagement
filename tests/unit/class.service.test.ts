import ClassService from '../../backend/src/services/classService';

describe('ClassService', () => {
  it('should return true if class is not full and not cancelled', () => {
    const classItem = {
      capacity: 5,
      bookings: [
        { status: 'CONFIRMED' },
        { status: 'CONFIRMED' },
      ],
      isCancelled: false,
    };
    expect(ClassService.canBookClass(classItem)).toBe(true);
  });

  it('should return false if class is full', () => {
    const classItem = {
      capacity: 2,
      bookings: [
        { status: 'CONFIRMED' },
        { status: 'CONFIRMED' },
      ],
      isCancelled: false,
    };
    expect(ClassService.canBookClass(classItem)).toBe(false);
  });

  it('should return false if class is cancelled', () => {
    const classItem = {
      capacity: 5,
      bookings: [
        { status: 'CONFIRMED' },
      ],
      isCancelled: true,
    };
    expect(ClassService.canBookClass(classItem)).toBe(false);
  });
});
