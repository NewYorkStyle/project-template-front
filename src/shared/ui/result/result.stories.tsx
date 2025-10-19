import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {Button} from 'antd';

import {Result} from './result';

const meta: Meta<typeof Result> = {
  component: Result,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Result',
} satisfies Meta<typeof Result>;

export default meta;

type TStory = StoryObj<typeof meta>;

// Базовая стори
export const Default: TStory = {
  args: {
    status: 'success',
    subTitle: 'Данные были успешно сохранены в системе.',
    title: 'Операция выполнена успешно',
  },
};

// Различные статусы
export const Success: TStory = {
  args: {
    status: 'success',
    subTitle: 'Все операции завершены успешно.',
    title: 'Успешное выполнение',
  },
};

export const Error: TStory = {
  args: {
    status: 'error',
    subTitle: 'Пожалуйста, попробуйте еще раз или обратитесь в поддержку.',
    title: 'Произошла ошибка',
  },
};

export const Warning: TStory = {
  args: {
    status: 'warning',
    subTitle: 'Некоторые операции требуют вашего внимания.',
    title: 'Внимание',
  },
};

export const Info: TStory = {
  args: {
    status: 'info',
    subTitle: 'Это информационное сообщение для пользователя.',
    title: 'Информация',
  },
};

export const NotFound: TStory = {
  args: {
    status: '404',
    subTitle: 'Извините, страница, которую вы посетили, не существует.',
    title: '404',
  },
};

export const Forbidden: TStory = {
  args: {
    status: '403',
    subTitle: 'У вас нет доступа к этой странице.',
    title: '403',
  },
};

export const ServerError: TStory = {
  args: {
    status: '500',
    subTitle: 'Извините, произошла внутренняя ошибка сервера.',
    title: '500',
  },
};

// С дополнительными элементами
export const WithExtraContent: TStory = {
  args: {
    extra: [
      <Button type='primary' key='console'>
        Перейти в профиль
      </Button>,
      <Button key='buy'>Вернуться назад</Button>,
    ],
    status: 'success',
    subTitle: 'Ваши данные были успешно сохранены.',
    title: 'Профиль обновлен',
  },
};

// С кастомной иконкой
export const CustomIcon: TStory = {
  args: {
    icon: (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#1890ff',
          borderRadius: '50%',
          color: 'white',
          display: 'flex',
          fontSize: 24,
          fontWeight: 'bold',
          height: 64,
          justifyContent: 'center',
          width: 64,
        }}
      >
        ✓
      </div>
    ),
    subTitle: 'Этот результат использует пользовательскую иконку.',
    title: 'Кастомная иконка',
  },
};

// Все возможные пропсы
export const FullFeatured: TStory = {
  args: {
    extra: [
      <Button type='primary' key='primary'>
        Основная кнопка
      </Button>,
      <Button key='secondary'>Вторичная кнопка</Button>,
    ],
    status: 'success',
    subTitle: 'Этот пример демонстрирует все доступные свойства компонента.',
    title: 'Полный набор пропсов',
  },
};

// Длинный текст
export const LongText: TStory = {
  args: {
    status: 'info',
    subTitle:
      'Это тоже очень длинное описание, которое может содержать много дополнительной информации для пользователя. Оно показывает, как компонент обрабатывает многострочный текст и обеспечивает хорошее отображение даже с большими объемами контента.',
    title:
      'Очень длинное название результата, которое может занимать несколько строк и демонстрирует, как компонент ведет себя с большими текстами',
  },
};
