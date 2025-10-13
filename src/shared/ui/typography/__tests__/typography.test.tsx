import {fireEvent, render, screen} from '@testing-library/react';

import {Typography} from '../typography';

describe('Typography', () => {
  describe('Text', () => {
    it('should render text with children', () => {
      render(<Typography.Text>Simple text</Typography.Text>);

      expect(screen.getByText('Simple text')).toBeInTheDocument();
    });

    it('should handle click events', () => {
      const handleClick = jest.fn();

      render(
        <Typography.Text onClick={handleClick}>Clickable text</Typography.Text>
      );

      const text = screen.getByText('Clickable text');
      fireEvent.click(text);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should render with different types', () => {
      render(
        <>
          <Typography.Text type='secondary'>Secondary text</Typography.Text>
          <Typography.Text type='success'>Success text</Typography.Text>
          <Typography.Text type='warning'>Warning text</Typography.Text>
          <Typography.Text type='danger'>Danger text</Typography.Text>
        </>
      );

      expect(screen.getByText('Secondary text')).toBeInTheDocument();
      expect(screen.getByText('Success text')).toBeInTheDocument();
      expect(screen.getByText('Warning text')).toBeInTheDocument();
      expect(screen.getByText('Danger text')).toBeInTheDocument();
    });

    it('should render with style props', () => {
      render(
        <Typography.Text strong italic underline delete mark code disabled>
          Styled text
        </Typography.Text>
      );

      expect(screen.getByText('Styled text')).toBeInTheDocument();
    });

    it('should render with ellipsis', () => {
      render(
        <Typography.Text ellipsis>
          Long text that should be truncated
        </Typography.Text>
      );

      expect(
        screen.getByText('Long text that should be truncated')
      ).toBeInTheDocument();
    });
  });

  describe('Paragraph', () => {
    it('should render paragraph with children', () => {
      render(<Typography.Paragraph>Paragraph content</Typography.Paragraph>);

      expect(screen.getByText('Paragraph content')).toBeInTheDocument();
    });

    it('should handle click events', () => {
      const handleClick = jest.fn();

      render(
        <Typography.Paragraph onClick={handleClick}>
          Clickable paragraph
        </Typography.Paragraph>
      );

      const paragraph = screen.getByText('Clickable paragraph');
      fireEvent.click(paragraph);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should render with different types', () => {
      render(
        <Typography.Paragraph type='secondary'>
          Secondary paragraph
        </Typography.Paragraph>
      );

      expect(screen.getByText('Secondary paragraph')).toBeInTheDocument();
    });
  });

  describe('Title', () => {
    it('should render title with children', () => {
      render(<Typography.Title>Title content</Typography.Title>);

      expect(screen.getByText('Title content')).toBeInTheDocument();
    });

    it('should handle click events', () => {
      const handleClick = jest.fn();

      render(
        <Typography.Title onClick={handleClick}>
          Clickable title
        </Typography.Title>
      );

      const title = screen.getByText('Clickable title');
      fireEvent.click(title);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should render with different levels', () => {
      render(
        <>
          <Typography.Title level={1}>Heading 1</Typography.Title>
          <Typography.Title level={2}>Heading 2</Typography.Title>
          <Typography.Title level={3}>Heading 3</Typography.Title>
          <Typography.Title level={4}>Heading 4</Typography.Title>
          <Typography.Title level={5}>Heading 5</Typography.Title>
        </>
      );

      expect(screen.getByText('Heading 1')).toBeInTheDocument();
      expect(screen.getByText('Heading 2')).toBeInTheDocument();
      expect(screen.getByText('Heading 3')).toBeInTheDocument();
      expect(screen.getByText('Heading 4')).toBeInTheDocument();
      expect(screen.getByText('Heading 5')).toBeInTheDocument();
    });
  });

  describe('Link', () => {
    it('should render link with children', () => {
      render(<Typography.Link href='#'>Link content</Typography.Link>);

      expect(screen.getByText('Link content')).toBeInTheDocument();
    });

    it('should handle click events', () => {
      const handleClick = jest.fn();

      render(
        <Typography.Link onClick={handleClick}>Clickable link</Typography.Link>
      );

      const link = screen.getByText('Clickable link');
      fireEvent.click(link);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should render with href', () => {
      render(
        <Typography.Link href='https://example.com'>
          External link
        </Typography.Link>
      );

      const link = screen.getByText('External link');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('should render with different types', () => {
      render(<Typography.Link type='success'>Success link</Typography.Link>);

      expect(screen.getByText('Success link')).toBeInTheDocument();
    });
  });
});
