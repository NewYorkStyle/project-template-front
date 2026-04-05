import '@testing-library/jest-dom/vitest';
import {vi} from 'vitest';

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
      postMessage: vi.fn(),
      close: vi.fn(),
      start: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onmessage: null,
      onmessageerror: null,
    } as unknown as MessagePort;

    const port2 = {
      postMessage: vi.fn(),
      close: vi.fn(),
      start: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onmessage: null,
      onmessageerror: null,
    } as unknown as MessagePort;

    return {port1, port2};
  }
}

global.MessageChannel = MockMessageChannel;

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query) => ({
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  })),
  writable: true,
});

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));
