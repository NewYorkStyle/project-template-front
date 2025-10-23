import {render, waitFor} from '@testing-library/react';

import {Page} from '../page';

describe('Page Component', () => {
  beforeEach(() => {
    document.title = '';
  });

  it('should set document title correctly', async () => {
    const testTitle = 'test';

    render(
      <Page title={testTitle}>
        <div>Content</div>
      </Page>
    );

    await waitFor(() => {
      expect(global.window.document.title).toBe(testTitle);
    });
  });

  it('should render children correctly', () => {
    const testContent = 'Test content';

    const {getByText} = render(
      <Page title='Test Page'>
        <div>{testContent}</div>
      </Page>
    );

    expect(getByText(testContent)).toBeInTheDocument();
  });

  it('should update title when prop changes', async () => {
    const {rerender} = render(
      <Page title='Initial Title'>
        <div>Content</div>
      </Page>
    );

    await waitFor(() => {
      expect(document.title).toBe('Initial Title');
    });

    rerender(
      <Page title='Updated Title'>
        <div>Content</div>
      </Page>
    );

    await waitFor(() => {
      expect(document.title).toBe('Updated Title');
    });
  });
});
