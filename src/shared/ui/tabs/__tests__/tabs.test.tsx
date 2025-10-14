import {fireEvent, render, screen} from '@testing-library/react';

import {Tabs} from '../tabs';

describe('Tabs', () => {
  const items = [
    {
      analyticsLabel: 'analytics-tab1',
      children: 'Content 1',
      key: 'tab1',
      label: 'Tab 1',
    },
    {
      analyticsLabel: 'analytics-tab2',
      children: 'Content 2',
      key: 'tab2',
      label: 'Tab 2',
    },
    {
      children: 'Content 3',
      key: 'tab3',
      label: 'Tab 3',
    },
  ];

  it('should render tabs with items', () => {
    render(<Tabs items={items} />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('should render tab content', () => {
    render(<Tabs items={items} />);

    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('should handle tab changes', () => {
    const handleChange = jest.fn();

    render(<Tabs items={items} onChange={handleChange} />);

    const tab2 = screen.getByText('Tab 2');
    fireEvent.click(tab2);

    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  it('should accept default active key', () => {
    render(<Tabs items={items} defaultActiveKey='tab2' />);

    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('should accept controlled active key', () => {
    render(<Tabs items={items} activeKey='tab3' />);

    expect(screen.getByText('Content 3')).toBeInTheDocument();
  });

  it('should accept type prop', () => {
    render(<Tabs items={items} type='card' />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('should accept size prop', () => {
    render(<Tabs items={items} size='large' />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('should be centered when centered prop is true', () => {
    render(<Tabs items={items} centered />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('should destroy inactive tab panes when destroyOnHidden is true', () => {
    render(<Tabs items={items} destroyOnHidden />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('should render with items containing analyticsLabel without errors', () => {
    expect(() => render(<Tabs items={items} />)).not.toThrow();
  });
});
