import { fireEvent, render, waitFor } from '@testing-library/react';
import RegisterForm from '../../forms/RegisterForm';
import { testAuthContext } from '../helpers/testHelpers';
import authContext from '../../contexts/authContext';

jest.mock('../../api');

describe('RegisterForm', () => {
  const renderRegisterForm = () => {
    return render(
      <authContext.Provider value={testAuthContext}>
        <RegisterForm />
      </authContext.Provider>
    )
  }

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderRegisterForm();
  });

  it('Renders consistently', () => {
    const { asFragment } = renderRegisterForm();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit on button press', async () => {
    const { getByText, getByLabelText } = renderRegisterForm();
    const usernameInput = getByLabelText('Username (required)');
    const passwordInput = getByLabelText('Password (required)');
    const emailInput = getByLabelText('Email Address (required)');
    fireEvent.change(usernameInput, {target: {value: 'username'}});
    fireEvent.change(passwordInput, {target: {value: 'password'}});
    fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
    await waitFor(() => {
      fireEvent.click(getByText('Register'));
      expect(testAuthContext.register).toHaveBeenCalledWith({
        username: 'username',
        password: 'password',
        email: 'test@test.com'
      })
    });
  });

  it('Shows validation error when image is not URL, clear when empty', async () => {
    const { getByText, findByText, getByLabelText } = renderRegisterForm();
    const profileImgInput = getByLabelText('Profile Image URL (Optional, default image will be provided if blank)');
    fireEvent.change(profileImgInput, {target: {value: 'invalid'}})
    fireEvent.click(getByText('Register'));
    const error = await findByText("Invalid profile URL format.", {exact: false});
    expect(error).toBeInTheDocument();
    fireEvent.change(profileImgInput, {target: {value: ''}})
    fireEvent.click(getByText('Register'));
    await waitFor(() => {
      expect(error).not.toBeInTheDocument();
    })
  });

  it('Shows validation error when email format is wrong', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, getByLabelText, findByText } = renderRegisterForm();
    const emailInput = getByLabelText('Email Address (required)');
    fireEvent.change(emailInput, {target: {value: 'invalid'}});
    fireEvent.click(getByText('Register'));
    const error = await findByText("Invalid email address format.", {exact: false});
    expect(error).toBeInTheDocument();
  });

  it('Shows error if name is longer than 25 characters', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, getByLabelText, findByText } = renderRegisterForm();
    const usernameInput = getByLabelText('Username (required)');
    fireEvent.change(usernameInput, {target: {value: 'dsskdjfskjdfhkjsdfkjkjsfsdsas'}});
    fireEvent.click(getByText('Register'));
    const error = await findByText("Username must be less than 25 characters");
    expect(error).toBeInTheDocument();
  });


  it('Shows error for empty required fields', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, findAllByText } = renderRegisterForm();
    fireEvent.click(getByText('Register'));
    await findAllByText("This field is required");
  });

  it('Shows error on failed submit', async () => {
    testAuthContext.register.mockImplementation(() => {throw new Error('Error')});
    const { getByText, getByLabelText, findByText } = renderRegisterForm();
    // Fill in required fields
    const usernameInput = getByLabelText('Username (required)');
    const passwordInput = getByLabelText('Password (required)');
    const emailInput = getByLabelText('Email Address (required)');
    fireEvent.change(usernameInput, {target: {value: 'username'}});
    fireEvent.change(passwordInput, {target: {value: 'password'}});
    fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
    fireEvent.click(getByText('Register'));
    const error = await findByText('Error');
    expect(error).toBeInTheDocument();
  });
});