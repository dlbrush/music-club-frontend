import { fireEvent, render, waitFor } from '@testing-library/react';
import LoginForm from '../../forms/LoginForm';
import { testUser, testAuthContext } from '../helpers/testHelpers';
import authContext from '../../contexts/authContext';

describe('LoginForm', () => {
  const renderLoginForm = () => {
    return render(
      <authContext.Provider value={testAuthContext}>
        <LoginForm />
      </authContext.Provider>
    )
  }

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderLoginForm();
  });

  it('Renders consistently', () => {
    const { asFragment } = renderLoginForm();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit on button press', async () => {
    const { getByText, getByLabelText } = renderLoginForm();
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password')
    fireEvent.change(usernameInput, {target: {value: 'username'}});
    fireEvent.change(passwordInput, {target: {value: 'password'}});
    await waitFor(() => {
      fireEvent.click(getByText('Log in'));
      expect(testAuthContext.login).toHaveBeenCalledWith({username: 'username', password: 'password'});
    });
  });

  it('Shows validation error if username too long', async () => {
    const { getByText, getByLabelText, findByText } = renderLoginForm();
    // Profile img needs URL input
    const usernameInput = getByLabelText('Username');
    fireEvent.change(usernameInput, {target: {value: 'aqwdqwadadqwqwqwdqdddqwdqwddqwq'}});
    fireEvent.click(getByText('Log in'));
    await findByText('Username must be less than 25 characters');
  });

  it('Shows validation error if fields empty', async () => {
    const { getByText, findAllByText } = renderLoginForm();
    fireEvent.click(getByText('Log in'));
    await findAllByText('This field is required');
  });

  it('Shows error on failed submit', async () => {
    testAuthContext.login.mockImplementation(() => {throw new Error('Error')});
    const { getByText, getByLabelText, findByText } = renderLoginForm();
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password')
    fireEvent.change(usernameInput, {target: {value: 'username'}});
    fireEvent.change(passwordInput, {target: {value: 'password'}});
    fireEvent.click(getByText('Log in'));
    const error = await findByText('Error');
    expect(error).toBeInTheDocument();
  });
});