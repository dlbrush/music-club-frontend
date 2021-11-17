import { render } from '@testing-library/react';
import LogoutButton from '../../auth/LogoutButton';

describe('LogoutButton', () => {
  it('Renders successfully', () => {
    render(<LogoutButton/>);
  });

  it('Maintains rendering', () => {
    const { asFragment } = render(<LogoutButton/>);
    expect(asFragment()).toMatchSnapshot();
  });
});