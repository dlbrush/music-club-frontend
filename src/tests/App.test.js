import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router";
import * as useAuthObj from '../hooks/useAuth';
import * as useUserObj from '../hooks/useUser';
import App from '../App';

describe('App', () => {

  describe('Authenticating', () => {

    beforeEach(() => {
      jest.spyOn(useAuthObj, 'default').mockImplementation(() => ({
        username: null,
        authenticating: true
      }));
      jest.spyOn(useUserObj, 'default').mockImplementation(() => ({
        loadingUser: true
      }));
    });

    it('Renders successfully', () => {
      render(<MemoryRouter><App/></MemoryRouter>);
    });

    it('Maintains rendering', () => {
      const { asFragment } = render(<MemoryRouter><App/></MemoryRouter>);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Shows login message', () => {
      const { getByText } = render(<MemoryRouter><App/></MemoryRouter>);
      expect(getByText('Checking login...')).toBeInTheDocument();
    });
  });

  describe('Loading user', () => {

    beforeEach(() => {
      jest.spyOn(useAuthObj, 'default').mockImplementation(() => ({
        username: 'username',
        authenticating: false
      }));
      jest.spyOn(useUserObj, 'default').mockImplementation(() => ({
        loadingUser: true
      }));
    });

    it('Renders successfully', () => {
      render(<MemoryRouter><App/></MemoryRouter>);
    });

    it('Maintains rendering', () => {
      const { asFragment } = render(<MemoryRouter><App/></MemoryRouter>);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Shows login message', () => {
      const { getByText } = render(<MemoryRouter><App/></MemoryRouter>);
      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('App loaded', () => {

    beforeEach(() => {
      jest.spyOn(useAuthObj, 'default').mockImplementation(() => ({
        username: 'username',
        authenticating: false
      }));
      jest.spyOn(useUserObj, 'default').mockImplementation(() => ({
        loadingUser: false,
        user: null
      }));
    });

    it('Renders successfully', () => {
      render(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
    });

    it('Maintains rendering', () => {
      const { asFragment } = render(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Shows header', () => {
      const { getByTestId } = render(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
      expect(getByTestId('Header')).toBeInTheDocument();
    });
  });
})
