import '@testing-library/jest-dom'; // Добавляет методы в expect, например, toBeInTheDocument

import { vi } from 'vitest';

vi.mock('redux-persist', () => ({
  persistReducer: (config: any, reducers: any) => reducers,
  persistStore: () => ({ persist: () => null, flush: () => null }),
}));