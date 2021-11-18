import { fireEvent, render, waitFor } from '@testing-library/react';
import EditProfileForm from '../../forms/EditProfileForm';
import { testUser, testUserContext } from '../helpers/testHelpers';
import userContext from '../../contexts/userContext';
import API from '../../api';

jest.mock('../../api');

describe('EditProfileForm', () => {
  const renderEditProfileForm = () => {
    return render(
      <userContext.Provider value={testUserContext}>
        <EditProfileForm />
      </userContext.Provider>
    )
  }
  beforeEach(() => {
    API.editUser.mockResolvedValue(testUser);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderEditProfileForm();
  });

  it('Renders consistently', () => {
    const { asFragment } = renderEditProfileForm();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit on button press', async () => {
    const { getByText, getByLabelText, findByText } = renderEditProfileForm();
    // Profile img needs URL input
    const profileImgInput = getByLabelText('Profile Image URL (Required)');
    fireEvent.change(profileImgInput, {target: {value: 'http://example.com/example.jpg'}});
    await waitFor(() => {
      fireEvent.click(getByText('Update profile'));
      expect(API.editUser).toHaveBeenCalledWith(
        'test1',
        {
          profileImgUrl: 'http://example.com/example.jpg',
          email: testUser.email
        }
      );
      expect(testUserContext.editUser).toHaveBeenCalledWith(testUser.email, testUser.profileImgUrl)
    });
    await findByText('Successfully updated your profile.')
  });

  it('Shows validation error when image is not URL,', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, findByText } = renderEditProfileForm();
    fireEvent.click(getByText('Update profile'));
    const error = await findByText("Invalid profile URL format.", {exact: false});
    expect(error).toBeInTheDocument();
  });

  it('Shows validation error when email format is wrong', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, getByLabelText, findByText } = renderEditProfileForm();
    const emailInput = getByLabelText('Email Address (required)');
    fireEvent.change(emailInput, {target: {value: 'invalid'}});
    fireEvent.click(getByText('Update profile'));
    const error = await findByText("Invalid email address format.", {exact: false});
    expect(error).toBeInTheDocument();
  });

  it('Shows validation error when email is empty', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, getByLabelText, findByText } = renderEditProfileForm();
    const emailInput = getByLabelText('Email Address (required)');
    fireEvent.change(emailInput, {target: {value: ''}});
    fireEvent.click(getByText('Update profile'));
    const error = await findByText("This field is required.",);
    expect(error).toBeInTheDocument();
  });

  it('Shows error on failed submit', async () => {
    API.editUser.mockImplementation(() => {throw new Error('Error')});
    const { getByText, getByLabelText, findByText } = renderEditProfileForm();
    // Profile img needs URL input
    const profileImgInput = getByLabelText('Profile Image URL (Required)');
    fireEvent.change(profileImgInput, {target: {value: 'http://example.com/example.jpg'}});
    fireEvent.click(getByText('Update profile'));
    const error = await findByText('Error');
    expect(error).toBeInTheDocument();
  });
});