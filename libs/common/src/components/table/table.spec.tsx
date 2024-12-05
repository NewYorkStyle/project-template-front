import {Table} from './table';
import {render} from '@testing-library/react';

describe('Table', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<Table />);
    expect(baseElement).toBeTruthy();
  });
});
