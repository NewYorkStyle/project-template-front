import {fireEvent, render, screen} from '@testing-library/react';

import {Segmented} from '../segmented';

describe('Segmented', () => {
  it('should render segmented with options', () => {
    const options = [
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
      {label: 'Option 3', value: 'option3'},
    ];

    render(<Segmented options={options} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('should handle value changes', () => {
    const handleChange = jest.fn();
    const options = [
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
    ];

    render(<Segmented options={options} onChange={handleChange} />);

    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('should be disabled when disabled prop is true', () => {
    const options = [
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
    ];

    render(<Segmented options={options} disabled />);

    const segmented = document.querySelector('.ant-segmented');
    expect(segmented).toHaveClass('ant-segmented-disabled');
  });

  it('should accept size prop', () => {
    const options = [
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
    ];

    render(<Segmented options={options} size='large' />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should render with block prop', () => {
    const options = [
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
    ];

    render(<Segmented options={options} block />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should render with default value', () => {
    const options = [
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
    ];

    render(<Segmented options={options} defaultValue='option2' />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should render with controlled value', () => {
    const options = [
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
    ];

    render(<Segmented options={options} value='option1' />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
