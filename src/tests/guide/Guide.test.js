import Guide from '../../guide/Guide';
import { render } from '@testing-library/react';

describe('Guide', () => {
  it('Renders successfully', () => {
    render(<Guide />);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<Guide />);
    expect(asFragment()).toMatchSnapshot();
  });
})