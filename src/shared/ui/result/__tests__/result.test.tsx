import {render, screen} from '@testing-library/react';
import type {ResultProps} from 'antd';

import {Button} from '../../button';
import {Result} from '../result';

type TStatusType =
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | '404'
  | '403'
  | '500';

describe('Result Component with Real Antd', () => {
  // Базовый тест на рендеринг
  it('should render without crashing', () => {
    render(<Result />);

    // Просто проверяем наличие компонента по классу ant-result
    expect(document.querySelector('.ant-result')).toBeInTheDocument();
  });

  // Тест с передачей title и subTitle
  it('should render title and subTitle correctly', () => {
    const testTitle = 'Test Title';
    const testSubTitle = 'Test Subtitle';

    render(<Result title={testTitle} subTitle={testSubTitle} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testSubTitle)).toBeInTheDocument();

    // Проверяем что заголовки находятся внутри компонента Result
    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toHaveClass('ant-result-title');

    const subTitleElement = screen.getByText(testSubTitle);
    expect(subTitleElement).toHaveClass('ant-result-subtitle');
  });

  // Тест различных статусов
  it.each<TStatusType>([
    'success',
    'error',
    'warning',
    'info',
    '404',
    '403',
    '500',
  ])('should render with status %s', (status) => {
    const testTitle = `Status: ${status}`;
    render(<Result status={status} title={testTitle} />);

    // Проверяем что компонент отрендерился с правильным заголовком
    expect(screen.getByText(testTitle)).toBeInTheDocument();

    // Проверяем наличие основного компонента и правильного класса статуса
    const resultElement = document.querySelector('.ant-result');
    expect(resultElement).toBeInTheDocument();
    expect(resultElement).toHaveClass(`ant-result-${status}`);
  });

  // Тест с дополнительными элементами (extra)
  it('should render extra content correctly', () => {
    const testTitle = 'Test with extra buttons';
    const extraContent = [
      <Button key='1' type='primary'>
        Primary Button
      </Button>,
      <Button key='2'>Secondary Button</Button>,
    ];

    render(<Result extra={extraContent} title={testTitle} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText('Primary Button')).toBeInTheDocument();
    expect(screen.getByText('Secondary Button')).toBeInTheDocument();

    // Проверяем что кнопки находятся в области extra
    const extraContainer = document.querySelector('.ant-result-extra');
    expect(extraContainer).toBeInTheDocument();

    // Проверяем что кнопки есть внутри extra контейнера
    expect(extraContainer).toHaveTextContent('Primary Button');
    expect(extraContainer).toHaveTextContent('Secondary Button');
  });

  // Тест с кастомной иконкой
  it('should render custom icon', () => {
    const customIcon = <div data-testid='custom-icon'>Custom Icon</div>;
    const testTitle = 'Test with custom icon';

    render(<Result icon={customIcon} title={testTitle} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();

    // Проверяем что кастомная иконка находится в области иконки результата
    const customIconElement = screen.getByTestId('custom-icon');
    const iconContainer = document.querySelector('.ant-result-icon');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toContainElement(customIconElement);
  });

  // Тест на передачу всех props
  it('should pass all props to AntdResult', () => {
    const allProps: ResultProps = {
      extra: [<Button key='test'>Test Button</Button>],
      status: 'success',
      subTitle: 'Testing all props',
      title: 'Complete Test',
    };

    render(<Result {...allProps} />);

    expect(screen.getByText('Complete Test')).toBeInTheDocument();
    expect(screen.getByText('Testing all props')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();

    // Проверяем структуру компонента
    expect(
      document.querySelector('.ant-result.ant-result-success')
    ).toBeInTheDocument();
    expect(document.querySelector('.ant-result-title')).toHaveTextContent(
      'Complete Test'
    );
    expect(document.querySelector('.ant-result-subtitle')).toHaveTextContent(
      'Testing all props'
    );
  });

  // Тест на className
  it('should pass className correctly', () => {
    const testTitle = 'Test with custom class';
    const {container} = render(
      <Result className='custom-class' title={testTitle} />
    );

    expect(screen.getByText(testTitle)).toBeInTheDocument();

    // Проверяем что кастомный класс добавлен к корневому элементу
    const resultElement = container.querySelector('.ant-result');
    expect(resultElement).toHaveClass('custom-class');
    expect(resultElement).toHaveClass('ant-result');
  });

  // Тест без пропсов
  it('should render with minimal props', () => {
    render(<Result />);

    // Должен отрендериться компонент даже без пропсов
    const resultElement = document.querySelector('.ant-result');
    expect(resultElement).toBeInTheDocument();

    // Проверяем что нет текстового контента (заголовков)
    const titleElement = document.querySelector('.ant-result-title');
    const subTitleElement = document.querySelector('.ant-result-subtitle');

    if (titleElement) {
      expect(titleElement).toBeEmptyDOMElement();
    }
    if (subTitleElement) {
      expect(subTitleElement).toBeEmptyDOMElement();
    }
  });

  // Тест с только title
  it('should render with title only', () => {
    const testTitle = 'Only Title';
    render(<Result title={testTitle} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();

    // Проверяем что subTitle отсутствует или пустой
    const subTitleElement = document.querySelector('.ant-result-subtitle');
    if (subTitleElement) {
      expect(subTitleElement).toBeEmptyDOMElement();
    }
  });

  // Тест с только subTitle - ИСПРАВЛЕННАЯ ВЕРСИЯ
  it('should render with subTitle only', () => {
    const testSubTitle = 'Only SubTitle';
    render(<Result subTitle={testSubTitle} />);

    expect(screen.getByText(testSubTitle)).toBeInTheDocument();

    // Проверяем что title отсутствует или пустой
    const titleElement = document.querySelector('.ant-result-title');
    if (titleElement) {
      expect(titleElement).toBeEmptyDOMElement();
    }
  });

  // Дополнительный тест для проверки структуры с subTitle только
  it('should have correct structure with subTitle only', () => {
    const testSubTitle = 'Only SubTitle Test';
    render(<Result subTitle={testSubTitle} />);

    // Проверяем что subTitle отображается
    expect(screen.getByText(testSubTitle)).toBeInTheDocument();
    expect(screen.getByText(testSubTitle)).toHaveClass('ant-result-subtitle');

    // Проверяем что нет видимого текста в title (может быть пустой элемент)
    const titleElement = document.querySelector('.ant-result-title');
    if (titleElement) {
      // Если элемент title существует, он должен быть пустым
      expect(titleElement).toBeEmptyDOMElement();
    }
  });
});
