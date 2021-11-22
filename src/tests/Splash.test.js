import Splash from '../Splash';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('Guide', () => {
  it('Renders successfully', () => {
    render(<MemoryRouter><Splash /></MemoryRouter>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<MemoryRouter><Splash /></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
  });
});