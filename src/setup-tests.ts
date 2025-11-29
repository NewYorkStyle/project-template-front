import '@testing-library/jest-dom';

process.env.API_URL = process.env.API_URL || 'http://localhost:3001';

class MockMessageChannel implements MessageChannel {
  port1: MessagePort;
  port2: MessagePort;

  constructor() {
    const {port1, port2} = this.createMockPorts();
    this.port1 = port1;
    this.port2 = port2;
  }

  private createMockPorts() {
    const port1 = {
      postMessage: jest.fn(),
      close: jest.fn(),
      start: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      onmessage: null,
      onmessageerror: null,
    } as unknown as MessagePort;

    const port2 = {
      postMessage: jest.fn(),
      close: jest.fn(),
      start: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      onmessage: null,
      onmessageerror: null,
    } as unknown as MessagePort;

    return {port1, port2};
  }
}

global.MessageChannel = MockMessageChannel;

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
