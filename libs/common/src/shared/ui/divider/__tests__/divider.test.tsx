import {Divider} from '../divider';
import {render} from '@testing-library/react';

jest.mock('../divider.module.less', () => ({
  divider: 'divider-test-class',
}));

describe('Divider', () => {
  it('should render successfully', () => {
    const {container} = render(<Divider />);
    const divider = container.querySelector('.divider-test-class');
    expect(divider).toBeInTheDocument();
  });

  it('should have correct class name', () => {
    const {container} = render(<Divider />);
    const divider = container.querySelector('.divider-test-class');
    expect(divider).toHaveClass('divider-test-class');
  });

  it('should be a div element', () => {
    const {container} = render(<Divider />);
    const divider = container.querySelector('.divider-test-class');
    expect(divider?.tagName).toBe('DIV');
  });
});
