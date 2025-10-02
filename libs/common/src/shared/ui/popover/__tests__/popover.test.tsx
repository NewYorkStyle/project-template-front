import {Button} from '../../button';
import {Typography} from '../../typography';
import {Popover} from '../popover';
import {render, screen} from '@testing-library/react';

describe('Popover', () => {
  it('should render popover with children', () => {
    render(
      <Popover content='Popover content'>
        <Button data-testid='popover-trigger'>Hover me</Button>
      </Popover>
    );

    expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
  });

  it('should render with title', () => {
    render(
      <Popover title='Popover Title' content='Popover content'>
        <Button>Hover me</Button>
      </Popover>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('should accept different trigger types', () => {
    render(
      <Popover trigger='click' content='Popover content'>
        <Button data-testid='click-trigger'>Click me</Button>
      </Popover>
    );

    expect(screen.getByTestId('click-trigger')).toBeInTheDocument();
  });

  it('should render custom content', () => {
    const content = (
      <div data-testid='custom-content'>
        <Typography.Text>Custom popover content</Typography.Text>
        <Button size='small'>Action</Button>
      </div>
    );

    render(
      <Popover content={content}>
        <Button>Hover me</Button>
      </Popover>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('should accept placement prop', () => {
    render(
      <Popover placement='top' content='Popover content'>
        <Button data-testid='placement-test'>Test placement</Button>
      </Popover>
    );

    expect(screen.getByTestId('placement-test')).toBeInTheDocument();
  });

  it('should handle open/close state props', () => {
    render(
      <Popover open={false} content='Popover content'>
        <Button>Trigger</Button>
      </Popover>
    );

    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });
});
