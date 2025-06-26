// tests/mocks/date.mock.ts
export function mockDate(isoDate: string) {
  const OriginalDate = Date;
  const mockTime = new OriginalDate(isoDate).getTime();

  class MockDate extends OriginalDate {
    constructor(...args: any[]) {
      if (args.length === 0) {
        super(mockTime);
      } else {
        // @ts-expect-error: spread accepté dans ce contexte de test
        super(...args);
      }
    }

    static now() {
      return mockTime;
    }

    static parse = OriginalDate.parse;
    static UTC = OriginalDate.UTC;
    static [Symbol.hasInstance](instance: any) {
      return instance instanceof OriginalDate;
    }
  }

  // @ts-expect-error: Surcharge globale pour les tests
  global.Date = MockDate;

  return () => {
    global.Date = OriginalDate;
  };
}

// Helper pour mock des dates relatives
export function mockDateRelative(hoursFromNow: number) {
  const mockTime = new Date();
  mockTime.setHours(mockTime.getHours() + hoursFromNow);
  return mockDate(mockTime.toISOString());
}