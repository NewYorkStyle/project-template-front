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

  test('renders vertical divider when orientation is vertical', () => {
    render(<Divider orientation='vertical' />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-vertical');
    expect(divider).not.toHaveClass('ant-divider-horizontal');
  });

  test('applies dashed style when dashed prop is true', () => {
    render(<Divider dashed />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-dashed');
  });

  test('applies title placement classes correctly', () => {
    render(<Divider titlePlacement='left'>Left Text</Divider>);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-with-text-start');
  });

  test('applies center title placement class', () => {
    render(<Divider titlePlacement='center'>Center Text</Divider>);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('ant-divider-with-text');
  });

  test('applies right title placement class', () => {
    render(<Divider titlePlacement='right'>Right Text</Divider>);
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
        orientation='horizontal'
        dashed
        titlePlacement='center'
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
