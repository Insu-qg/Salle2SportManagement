// vitest.config.ts
import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';


dotenv.config({ path: '.env.test' }); // charge ton .env.test automatiquement

export default defineConfig({
  plugins: [], // ajoute tes plugins si nécessaire
  test: {
    environment: 'node', // ou 'jsdom' si tu fais du frontend
    globals: true,        // permet d’utiliser `describe`, `it`, etc. sans import
    setupFiles: ['./tests/setup.ts'], // fichier d’init optionnel
    include: ['tests/**/*.test.{ts,js}'], // où sont tes tests
    exclude: ['node_modules', 'dist'],
  },
});
