import {Button} from '../button';
import {fireEvent, render, screen} from '@testing-library/react';

describe('Button', () => {
  it('should render with children', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', {name: 'Click me'});
    expect(button).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should show loading state', () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
