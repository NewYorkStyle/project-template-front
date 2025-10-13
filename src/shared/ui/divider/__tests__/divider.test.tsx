import {render, screen} from '@testing-library/react';

import {Divider} from '../divider';

describe('Divider Component', () => {
  test('renders default divider', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('ant-divider');
    expect(divider).toHaveClass('ant-divider-horizontal');
  });

  test('renders divider with text', () => {
    const text = 'Test Divider';
    render(<Divider>{text}</Divider>);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByRole('separator')).toHaveClass('ant-divider-with-text');
  });

  test('renders horizontal divider by default', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-horizontal');
    expect(divider).not.toHaveClass('ant-divider-vertical');
  });

  test('renders vertical divider when type is vertical', () => {
    render(<Divider type='vertical' />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-vertical');
    expect(divider).not.toHaveClass('ant-divider-horizontal');
  });

  test('applies dashed style when dashed prop is true', () => {
    render(<Divider dashed />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-dashed');
  });

  test('applies orientation class', () => {
    render(<Divider orientation='left'>Left Text</Divider>);
    const divider = screen.getByRole('separator');
    // В Ant Design v5 изменились классы для orientation
    expect(divider).toHaveClass('ant-divider-with-text-start');
  });

  test('applies center orientation class', () => {
    render(<Divider orientation='center'>Center Text</Divider>);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-with-text');
  });

  test('applies right orientation class', () => {
    render(<Divider orientation='right'>Right Text</Divider>);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-with-text-end');
  });

  test('applies plain style when plain prop is true', () => {
    render(<Divider plain>Plain Text</Divider>);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-plain');
  });

  test('renders without children correctly', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
    // Should not have text-related classes when no children
    expect(divider).not.toHaveClass('ant-divider-with-text');
  });

  test('combines multiple props correctly', () => {
    render(
      <Divider
        type='horizontal'
        dashed
        orientation='center'
        plain
        className='test-class'
      >
        Combined Props
      </Divider>
    );

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-horizontal');
    expect(divider).toHaveClass('ant-divider-dashed');
    expect(divider).toHaveClass('ant-divider-with-text');
    expect(divider).toHaveClass('ant-divider-plain');
    expect(divider).toHaveClass('test-class');
  });
});
