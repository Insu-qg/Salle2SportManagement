// 📁 tests/mocks/date.mock.ts

export function mockDate(isoDate: string) {
  const OriginalDate = Date;

  class MockDate extends OriginalDate {
    constructor(...args: any[]) {
      if (args.length === 0) {
        super(isoDate); // Utilise la date mockée
      } else {
        // @ts-expect-error: spread accepté dans ce contexte de test
        super(...args); // Reproduit le comportement normal sinon
      }
    }

    static now() {
      return new OriginalDate(isoDate).getTime();
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
