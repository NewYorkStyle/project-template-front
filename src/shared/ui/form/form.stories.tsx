/* eslint-disable no-console */
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from '../button';
import {Input} from '../input';
import {Select} from '../select';
import {Typography} from '../typography';

import {Form} from './form';

const meta: Meta<typeof Form> = {
  argTypes: {
    colon: {
      control: 'boolean' as const,
      description: 'Показывать двоеточие после labels',
    },
    disabled: {
      control: 'boolean' as const,
      description: 'Отключенное состояние всей формы',
    },
    labelAlign: {
      control: {type: 'select' as const},
      description: 'Выравнивание labels',
      options: ['left', 'right'],
    },
    layout: {
      control: {type: 'select' as const},
      description: 'Расположение формы',
      options: ['horizontal', 'vertical', 'inline'],
    },
    size: {
      control: {type: 'select' as const},
      description: 'Размер формы',
      options: ['small', 'middle', 'large'],
    },
  },
  args: {
    colon: true,
    disabled: false,
    labelAlign: 'right',
    layout: 'horizontal',
    size: 'middle',
  },
  component: Form,
  tags: ['autodocs'],
  title: 'Components/Form',
};

export default meta;
type TStory = StoryObj<typeof Form>;

export const Basic: TStory = {
  render: (args) => {
    const [form] = Form.useForm();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = (values: any) => {
      console.log('Form values:', values);
    };

    return (
      <div style={{width: '600px'}}>
        <Typography.Title level={3}>Базовая форма</Typography.Title>
        <Form {...args} form={form} onFinish={onFinish}>
          <Form.Item
            label='Имя пользователя'
            name='username'
            rules={[
              {
                message: 'Пожалуйста, введите имя пользователя!',
                required: true,
              },
            ]}
          >
            <Input placeholder='Введите имя пользователя' />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              {message: 'Пожалуйста, введите email!', required: true},
              {message: 'Некорректный email!', type: 'email'},
            ]}
          >
            <Input placeholder='Введите email' />
          </Form.Item>

          <Form.Item
            label='Пароль'
            name='password'
            rules={[{message: 'Пожалуйста, введите пароль!', required: true}]}
          >
            <Input.Password placeholder='Введите пароль' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  },
};

export const WithValidation: TStory = {
  args: {
    layout: 'vertical',
  },
  render: (args) => {
    const [form] = Form.useForm();

    return (
      <div style={{width: '500px'}}>
        <Typography.Title level={3}>Форма с валидацией</Typography.Title>
        <Form
          {...args}
          form={form}
          onFinish={(values) => console.log('Valid form:', values)}
        >
          <Form.Item
            label='Возраст'
            name='age'
            rules={[
              {message: 'Пожалуйста, введите возраст!', required: true},
              {message: 'Только цифры!', pattern: /^[0-9]+$/},
              {message: 'Минимальный возраст 18 лет!', min: 18},
              {max: 100, message: 'Максимальный возраст 100 лет!'},
            ]}
          >
            <Input placeholder='Введите возраст' />
          </Form.Item>

          <Form.Item
            label='Вебсайт'
            name='website'
            rules={[
              {message: 'Пожалуйста, введите вебсайт!', required: true},
              {message: 'Некорректный URL!', type: 'url'},
            ]}
          >
            <Input placeholder='https://example.com' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Проверить
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  },
};

export const WithSelect: TStory = {
  render: (args) => {
    const [form] = Form.useForm();

    return (
      <div style={{width: '500px'}}>
        <Typography.Title level={3}>Форма с выбором</Typography.Title>
        <Form
          {...args}
          form={form}
          onFinish={(values) => console.log('Form with select:', values)}
        >
          <Form.Item
            label='Город'
            name='city'
            rules={[{message: 'Пожалуйста, выберите город!', required: true}]}
          >
            <Select
              placeholder='Выберите город'
              options={[
                {label: 'Москва', value: 'moscow'},
                {label: 'Санкт-Петербург', value: 'spb'},
                {label: 'Новосибирск', value: 'novosibirsk'},
                {label: 'Екатеринбург', value: 'ekb'},
              ]}
            />
          </Form.Item>

          <Form.Item
            label='Интересы'
            name='interests'
            rules={[
              {message: 'Пожалуйста, выберите интересы!', required: true},
            ]}
          >
            <Select
              mode='multiple'
              placeholder='Выберите интересы'
              options={[
                {label: 'Программирование', value: 'coding'},
                {label: 'Дизайн', value: 'design'},
                {label: 'Музыка', value: 'music'},
                {label: 'Спорт', value: 'sports'},
                {label: 'Путешествия', value: 'travel'},
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  },
};

export const InlineForm: TStory = {
  args: {
    layout: 'inline',
  },
  render: (args) => {
    const [form] = Form.useForm();

    return (
      <div style={{width: '800px'}}>
        <Typography.Title level={3}>Inline форма</Typography.Title>
        <Form
          {...args}
          form={form}
          onFinish={(values) => console.log('Inline form:', values)}
        >
          <Form.Item
            name='search'
            rules={[{message: 'Введите поисковый запрос', required: true}]}
          >
            <Input placeholder='Поиск...' />
          </Form.Item>

          <Form.Item name='category'>
            <Select
              placeholder='Категория'
              style={{width: 120}}
              options={[
                {label: 'Все', value: 'all'},
                {label: 'Техника', value: 'tech'},
                {label: 'Книги', value: 'books'},
                {label: 'Одежда', value: 'clothes'},
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Найти
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  },
};
