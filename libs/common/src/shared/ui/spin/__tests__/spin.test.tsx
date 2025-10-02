import {Spin} from '../spin';
import {render, screen} from '@testing-library/react';

describe('Spin', () => {
  it('should render spin component', () => {
    const {container} = render(<Spin />);

    const spin = container.querySelector('.ant-spin');
    expect(spin).toBeInTheDocument();
  });

  it('should render with spinning state', () => {
    const {container} = render(<Spin spinning />);

    const spin = container.querySelector('.ant-spin-spinning');
    expect(spin).toBeInTheDocument();
  });

  it('should render with size prop', () => {
    const {container} = render(<Spin size='large' />);

    const spin = container.querySelector('.ant-spin-lg');
    expect(spin).toBeInTheDocument();
  });

  it('should render with tip text when has children', () => {
    render(
      <Spin tip='Loading...'>
        <div>Content</div>
      </Spin>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render with delay', () => {
    const {container} = render(<Spin delay={500} />);

    const spin = container.querySelector('.ant-spin');
    expect(spin).toBeInTheDocument();
  });

  it('should render with children', () => {
    render(
      <Spin>
        <div data-testid='spin-content'>Content</div>
      </Spin>
    );

    expect(screen.getByTestId('spin-content')).toBeInTheDocument();
  });

  it('should render in fullscreen mode', () => {
    const {container} = render(<Spin fullscreen />);

    const fullscreenSpin = container.querySelector('.ant-spin-fullscreen');
    expect(fullscreenSpin).toBeInTheDocument();
  });

  it('should render with small size', () => {
    const {container} = render(<Spin size='small' />);

    const spin = container.querySelector('.ant-spin-sm');
    expect(spin).toBeInTheDocument();
  });

  it('should render with default size', () => {
    const {container} = render(<Spin size='default' />);

    const spin = container.querySelector('.ant-spin');
    expect(spin).toBeInTheDocument();
  });
});
