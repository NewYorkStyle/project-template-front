import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {QueryProvider} from '../query-provider';

describe('QueryProvider', () => {
  it('renders children inside QueryClientProvider', () => {
    render(
      <QueryProvider>
        <div>children rendered</div>
      </QueryProvider>
    );

    expect(screen.getByText('children rendered')).toBeInTheDocument();
  });
});
