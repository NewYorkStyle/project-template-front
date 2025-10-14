import '@testing-library/jest-dom';

process.env.API_URL = process.env.API_URL || 'http://localhost:3001';

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation((query) => ({
    addEventListener: jest.fn(),
    addListener: jest.fn(),
    dispatchEvent: jest.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(),
  })),
  writable: true,
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}));

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}));
