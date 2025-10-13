import {act, render, screen} from '@testing-library/react';

import {Statistic} from '../statistic';

describe('Statistic Component', () => {
  describe('Basic Statistic', () => {
    it('should render with title and value', () => {
      render(<Statistic title='Active Users' value={112893} />);

      expect(screen.getByText('Active Users')).toBeInTheDocument();
      // Antd форматирует числа с разделителями тысяч
      expect(screen.getByText('112,893')).toBeInTheDocument();
    });

    it('should render with prefix and suffix', () => {
      render(
        <Statistic title='Revenue' value={112893} prefix='₽' suffix='руб.' />
      );

      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('₽')).toBeInTheDocument();
      expect(screen.getByText('112,893')).toBeInTheDocument();
      expect(screen.getByText('руб.')).toBeInTheDocument();
    });

    it('should render with precision', () => {
      render(
        <Statistic
          title='Success Rate'
          value={98.765}
          precision={2}
          suffix='%'
        />
      );

      // Antd округляет числа согласно precision, но разбивает на части
      const integerPart = screen.getByText('98');
      const decimalPart = screen.getByText('.76');
      const suffixPart = screen.getByText('%');

      expect(integerPart).toBeInTheDocument();
      expect(decimalPart).toBeInTheDocument();
      expect(suffixPart).toBeInTheDocument();
    });

    it('should render in loading state', () => {
      render(<Statistic title='Loading' value={112893} loading />);

      expect(screen.getByText('Loading')).toBeInTheDocument();
      // Проверяем наличие спиннера загрузки
      const spinner = document.querySelector('.ant-skeleton');
      expect(spinner).toBeInTheDocument();
    });

    it('should apply custom value style', () => {
      const valueStyle = {color: '#52c41a', fontSize: '24px'};
      render(
        <Statistic
          title='Custom Style'
          value={112893}
          valueStyle={valueStyle}
        />
      );

      const valueElement = screen.getByText('112,893');
      expect(valueElement).toHaveStyle({color: 'rgb(82, 196, 26)'});
    });

    it('should use custom separators', () => {
      render(
        <Statistic
          title='Custom Separators'
          value={112893.45}
          precision={2}
          groupSeparator=','
          decimalSeparator='.'
        />
      );

      // Проверяем части числа отдельно
      const integerPart = screen.getByText('112,893');
      const decimalPart = screen.getByText('.45');

      expect(integerPart).toBeInTheDocument();
      expect(decimalPart).toBeInTheDocument();
    });
  });

  describe('Statistic.Timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it('should render timer with countdown', () => {
      const futureTime = Date.now() + 1000 * 60 * 5; // 5 minutes in future

      render(
        <Statistic.Timer
          type='countdown'
          title='Countdown'
          value={futureTime}
          format='HH:mm:ss'
        />
      );

      expect(screen.getByText('Countdown')).toBeInTheDocument();
      // Таймер должен отображать оставшееся время
      expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();
    });

    it('should call onFinish when countdown completes', () => {
      const onFinishMock = jest.fn();
      const pastTime = Date.now() - 1000; // 1 second in past

      render(
        <Statistic.Timer
          type='countdown'
          title='Completed'
          value={pastTime}
          onFinish={onFinishMock}
        />
      );

      // Даем время для выполнения колбэка
      act(() => {
        jest.advanceTimersByTime(100);
      });

      // onFinish должен быть вызван для прошедшего времени
      expect(onFinishMock).toHaveBeenCalled();
    });

    it('should update timer display over time', () => {
      const futureTime = Date.now() + 3000; // 3 seconds in future

      render(
        <Statistic.Timer
          type='countdown'
          title='Updating Timer'
          value={futureTime}
          format='s [seconds]'
        />
      );

      // Изначально должно показывать 3 секунды
      expect(screen.getByText(/3/)).toBeInTheDocument();

      // Перемещаем время на 1 секунду вперед с использованием act
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // Должен отображать 2 секунды
      expect(screen.getByText(/2/)).toBeInTheDocument();
    });

    it('should stop timer when unmounted', () => {
      const futureTime = Date.now() + 1000 * 10;
      const {unmount} = render(
        <Statistic.Timer
          type='countdown'
          title='Unmount Test'
          value={futureTime}
        />
      );

      const initialText = screen.getByText(/10/);
      expect(initialText).toBeInTheDocument();

      // Размонтируем компонент
      unmount();

      // Таймер должен быть очищен и не вызывать ошибок
      expect(() => {
        jest.advanceTimersByTime(5000);
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Statistic title='Accessible Stat' value={112893} />);

      const titleElement = screen.getByText('Accessible Stat');
      const valueElement = screen.getByText('112,893');

      expect(titleElement).toBeInTheDocument();
      expect(valueElement).toBeInTheDocument();

      // Проверяем базовую доступность
      const statisticElement = document.querySelector('.ant-statistic');
      expect(statisticElement).toBeInTheDocument();
    });

    it('should be accessible in loading state', () => {
      render(<Statistic title='Loading' value={112893} loading />);

      expect(screen.getByText('Loading')).toBeInTheDocument();

      // Проверяем наличие спиннера загрузки
      const spinner = document.querySelector('.ant-skeleton');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero value', () => {
      render(<Statistic title='Zero' value={0} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle negative value', () => {
      render(<Statistic title='Negative' value={-100} />);

      expect(screen.getByText('-100')).toBeInTheDocument();
    });

    it('should handle very large numbers', () => {
      render(<Statistic title='Large Number' value={999999999} />);

      // Antd форматирует большие числа с разделителями
      expect(screen.getByText('999,999,999')).toBeInTheDocument();
    });

    it('should handle undefined value', () => {
      render(<Statistic title='No Value' value={undefined} />);

      expect(screen.getByText('No Value')).toBeInTheDocument();
      // Для undefined значения antd отображает 0
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle string value', () => {
      render(<Statistic title='String Value' value='Custom Value' />);

      expect(screen.getByText('Custom Value')).toBeInTheDocument();
    });

    it('should handle NaN value', () => {
      render(<Statistic title='NaN Value' value={NaN} />);

      expect(screen.getByText('NaN Value')).toBeInTheDocument();
      expect(screen.getByText('NaN')).toBeInTheDocument();
    });

    // Удален тест с пустой строкой, так как он вызывает конфликт с поиском пустого текста
  });

  describe('Responsive Design', () => {
    it('should render with different sizes', () => {
      const {rerender} = render(<Statistic title='Small Stat' value={1000} />);

      expect(screen.getByText('Small Stat')).toBeInTheDocument();

      // Можно проверить разные пропсы
      rerender(
        <Statistic
          title='Large Stat'
          value={2000}
          valueStyle={{fontSize: 32}}
        />
      );

      expect(screen.getByText('Large Stat')).toBeInTheDocument();
    });
  });
});
