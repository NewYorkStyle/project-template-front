import {fireEvent, render, screen} from '@testing-library/react';

import {Input} from '../input';

describe('Input', () => {
  it('should render with placeholder', () => {
    render(<Input placeholder='Enter text' />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('should handle value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: 'test'}});

    expect(handleChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});
