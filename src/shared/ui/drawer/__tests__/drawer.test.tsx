/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {render, screen, fireEvent} from '@testing-library/react';
import {Button} from 'antd';

import {Drawer} from '../drawer';

// Правильный mock для Antd Drawer без передачи лишних пропсов в DOM
jest.mock('antd', () => {
  const actual = jest.requireActual('antd');

  const MockDrawer = ({
    children,
    className,
    closable = true,
    extra,
    keyboard,
    maskClosable,
    onClose,
    // Извлекаем пропсы которые не должны попадать в DOM
    open,
    placement,
    size,
    title,
    width,
    ...restProps
  }: any) => {
    if (!open) return null;

    return (
      <div
        data-testid='antd-drawer'
        className={className}
        // Передаем только безопасные пропсы
        {...restProps}
      >
        {/* Заголовок с extra */}
        {title && (
          <div data-testid='drawer-header'>
            <div data-testid='drawer-title'>{title}</div>
            {extra && <div data-testid='drawer-extra'>{extra}</div>}
          </div>
        )}

        <div data-testid='drawer-content'>{children}</div>

        {/* Скрытый элемент с информацией о пропсах для тестов */}
        <div
          data-testid='drawer-props'
          style={{display: 'none'}}
          data-placement={placement}
          data-width={width}
          data-size={size}
          data-closable={closable}
          data-mask-closable={maskClosable}
          data-keyboard={keyboard}
        />

        {closable && (
          <button onClick={onClose} data-testid='drawer-close-button'>
            Close
          </button>
        )}
      </div>
    );
  };

  return {
    ...actual,
    Drawer: jest.fn(MockDrawer),
  };
});

describe('Drawer Component', () => {
  const defaultProps = {
    onClose: jest.fn(),
    open: true,
    title: 'Test Drawer',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендерится с переданными пропсами', () => {
    render(
      <Drawer {...defaultProps}>
        <div>Test content</div>
      </Drawer>
    );

    expect(screen.getByTestId('antd-drawer')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-title')).toHaveTextContent('Test Drawer');
    expect(screen.getByTestId('drawer-content')).toHaveTextContent(
      'Test content'
    );
  });

  it('передает все пропсы в AntdDrawer', () => {
    const customProps = {
      ...defaultProps,
      closable: false,
      keyboard: false,
      maskClosable: true,
      placement: 'left' as const,
      size: 'large' as const,
      width: 400,
    };

    render(
      <Drawer {...customProps}>
        <div>Test content</div>
      </Drawer>
    );

    const drawer = screen.getByTestId('antd-drawer');
    const propsElement = screen.getByTestId('drawer-props');

    expect(drawer).toBeInTheDocument();
    expect(propsElement).toHaveAttribute('data-placement', 'left');
    expect(propsElement).toHaveAttribute('data-width', '400');
    expect(propsElement).toHaveAttribute('data-closable', 'false');
    expect(propsElement).toHaveAttribute('data-mask-closable', 'true');
    expect(propsElement).toHaveAttribute('data-size', 'large');
    expect(propsElement).toHaveAttribute('data-keyboard', 'false');
  });

  it('вызывает onClose при закрытии', () => {
    const onCloseMock = jest.fn();

    render(
      <Drawer {...defaultProps} onClose={onCloseMock} closable={true}>
        <div>Test content</div>
      </Drawer>
    );

    const closeButton = screen.getByTestId('drawer-close-button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('не рендерится когда open=false', () => {
    render(
      <Drawer {...defaultProps} open={false}>
        <div>Test content</div>
      </Drawer>
    );

    expect(screen.queryByTestId('antd-drawer')).not.toBeInTheDocument();
  });

  it('рендерится с дополнительными классами', () => {
    render(
      <Drawer {...defaultProps} className='custom-class'>
        <div>Test content</div>
      </Drawer>
    );

    const drawer = screen.getByTestId('antd-drawer');
    expect(drawer).toHaveClass('custom-class');
  });

  it('поддерживает разные размеры', () => {
    const {rerender} = render(
      <Drawer {...defaultProps} size='large'>
        <div>Test content</div>
      </Drawer>
    );

    let propsElement = screen.getByTestId('drawer-props');
    expect(propsElement).toHaveAttribute('data-size', 'large');

    rerender(
      <Drawer {...defaultProps} size='default'>
        <div>Test content</div>
      </Drawer>
    );

    propsElement = screen.getByTestId('drawer-props');
    expect(propsElement).toHaveAttribute('data-size', 'default');
  });

  it('рендерится без заголовка', () => {
    const {title, ...propsWithoutTitle} = defaultProps;

    render(
      <Drawer {...propsWithoutTitle}>
        <div>Test content</div>
      </Drawer>
    );

    expect(screen.getByTestId('antd-drawer')).toBeInTheDocument();
    expect(screen.queryByTestId('drawer-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('drawer-header')).not.toBeInTheDocument();
  });

  it('не показывает кнопку закрытия когда closable=false', () => {
    render(
      <Drawer {...defaultProps} closable={false}>
        <div>Test content</div>
      </Drawer>
    );

    expect(screen.queryByTestId('drawer-close-button')).not.toBeInTheDocument();
  });

  it('обрабатывает проп extra', () => {
    const extraContent = (
      <Button data-testid='extra-button'>Extra Action</Button>
    );

    render(
      <Drawer {...defaultProps} extra={extraContent}>
        <div>Test content</div>
      </Drawer>
    );

    expect(screen.getByTestId('extra-button')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-extra')).toBeInTheDocument();
  });

  it('рендерится без extra когда проп не передан', () => {
    render(
      <Drawer {...defaultProps}>
        <div>Test content</div>
      </Drawer>
    );

    expect(screen.queryByTestId('drawer-extra')).not.toBeInTheDocument();
  });
});

// Тест для интеграции с пользовательским взаимодействием
describe('Drawer Integration', () => {
  it('открывается и закрывается по клику', () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        <div>
          <Button onClick={() => setIsOpen(true)} data-testid='open-button'>
            Open
          </Button>
          <Drawer
            title='Test Drawer'
            open={isOpen}
            onClose={() => setIsOpen(false)}
            closable={true}
          >
            <div>Drawer Content</div>
          </Drawer>
        </div>
      );
    };

    render(<TestComponent />);

    // Проверяем что drawer изначально закрыт
    expect(screen.queryByTestId('antd-drawer')).not.toBeInTheDocument();

    // Открываем drawer
    fireEvent.click(screen.getByTestId('open-button'));
    expect(screen.getByTestId('antd-drawer')).toBeInTheDocument();
    expect(screen.getByText('Drawer Content')).toBeInTheDocument();

    // Закрываем drawer
    fireEvent.click(screen.getByTestId('drawer-close-button'));
    expect(screen.queryByTestId('antd-drawer')).not.toBeInTheDocument();
  });

  it('работает с дополнительными элементами в header', () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const extra = <Button data-testid='header-button'>Header Button</Button>;

      return (
        <div>
          <Button onClick={() => setIsOpen(true)} data-testid='open-button'>
            Open
          </Button>
          <Drawer
            title='Test Drawer'
            open={isOpen}
            onClose={() => setIsOpen(false)}
            extra={extra}
          >
            <div>Drawer Content</div>
          </Drawer>
        </div>
      );
    };

    render(<TestComponent />);

    // Открываем drawer
    fireEvent.click(screen.getByTestId('open-button'));

    expect(screen.getByTestId('antd-drawer')).toBeInTheDocument();
    expect(screen.getByTestId('header-button')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-extra')).toBeInTheDocument();
  });
});
