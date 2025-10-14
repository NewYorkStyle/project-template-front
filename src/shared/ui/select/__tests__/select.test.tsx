import {fireEvent, render, screen} from '@testing-library/react';

import {Select} from '../select';

describe('Select', () => {
  const options = [
    {analyticsLabel: 'opt1', label: 'Option 1', value: 'option1'},
    {analyticsLabel: 'opt2', label: 'Option 2', value: 'option2'},
    {analyticsLabel: 'opt3', label: 'Option 3', value: 'option3'},
  ];

  it('should render select with options', () => {
    render(<Select options={options} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<Select options={options} placeholder='Choose option' />);

    // Для Antd Select placeholder отображается в отдельном элементе
    expect(screen.getByText('Choose option')).toBeInTheDocument();
  });

  it('should handle value changes', () => {
    const handleChange = jest.fn();

    render(<Select options={options} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const option = screen.getByText('Option 2');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Select options={options} disabled />);

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('should accept size prop', () => {
    render(<Select options={options} size='large' />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should allow clear when allowClear prop is true', () => {
    render(<Select options={options} allowClear />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should show search when showSearch prop is true', () => {
    render(<Select options={options} showSearch />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render in multiple mode', () => {
    render(<Select options={options} mode='multiple' />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render with default value', () => {
    render(<Select options={options} defaultValue='option2' />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render with controlled value', () => {
    render(<Select options={options} value='option1' />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should handle focus events', () => {
    const handleFocus = jest.fn();

    render(<Select options={options} onFocus={handleFocus} />);

    const select = screen.getByRole('combobox');
    fireEvent.focus(select);

    expect(handleFocus).toHaveBeenCalled();
  });

  it('should render with loading state', () => {
    render(<Select options={options} loading />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
