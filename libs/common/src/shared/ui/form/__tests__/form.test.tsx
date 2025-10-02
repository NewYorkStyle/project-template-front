import {Button} from '../../button';
import {Input} from '../../input';
import {Form} from '../form';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';

describe('Form', () => {
  it('should render form with children', () => {
    render(
      <Form>
        <div data-testid='form-content'>Form Content</div>
      </Form>
    );

    expect(screen.getByTestId('form-content')).toBeInTheDocument();
  });

  it('should render form item with label', () => {
    render(
      <Form>
        <Form.Item label='Test Label'>
          <input data-testid='form-input' />
        </Form.Item>
      </Form>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('form-input')).toBeInTheDocument();
  });

  it('should show validation errors for required fields', async () => {
    render(
      <Form>
        <Form.Item
          name='requiredField'
          label='Required Field'
          rules={[{message: 'This field is required', required: true}]}
        >
          <Input data-testid='required-input' />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' data-testid='submit-button'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );

    // Пытаемся сабмитить пустую форму
    fireEvent.click(screen.getByTestId('submit-button'));

    // Ждем появления сообщения об ошибке
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  it('should handle form layout props', () => {
    render(
      <Form layout='vertical'>
        <Form.Item label='Test Field'>
          <Input data-testid='test-input' />
        </Form.Item>
      </Form>
    );

    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
  });

  it('should render form with reset functionality', () => {
    const TestForm = () => {
      const [form] = Form.useForm();

      return (
        <Form form={form}>
          <Form.Item name='username' label='Username'>
            <Input data-testid='username-input' />
          </Form.Item>
          <Button onClick={() => form.resetFields()} data-testid='reset-button'>
            Reset
          </Button>
        </Form>
      );
    };

    render(<TestForm />);

    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('reset-button')).toBeInTheDocument();
  });

  it('should accept form props', () => {
    render(
      <Form
        layout='horizontal'
        size='large'
        disabled={false}
        data-testid='test-form'
      >
        <Form.Item label='Test'>
          <Input />
        </Form.Item>
      </Form>
    );

    const form = screen.getByTestId('test-form');
    expect(form).toBeInTheDocument();
  });

  it('should render form with initial values', () => {
    const initialValues = {username: 'test'};

    render(
      <Form initialValues={initialValues}>
        <Form.Item name='username'>
          <Input data-testid='username-input' />
        </Form.Item>
      </Form>
    );

    expect(screen.getByTestId('username-input')).toBeInTheDocument();
  });
});
