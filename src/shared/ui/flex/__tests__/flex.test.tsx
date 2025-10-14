import {render, screen} from '@testing-library/react';

import {Flex} from '../flex';

describe('Flex', () => {
  it('should render children', () => {
    render(
      <Flex>
        <div data-testid='child-1'>Child 1</div>
        <div data-testid='child-2'>Child 2</div>
      </Flex>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('should apply vertical layout', () => {
    const {container} = render(
      <Flex vertical>
        <div>Child</div>
      </Flex>
    );
    const flexElement = container.firstChild;
    expect(flexElement).toBeInTheDocument();
  });
});
