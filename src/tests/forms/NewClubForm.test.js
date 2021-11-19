import { fireEvent, render, waitFor } from '@testing-library/react';
import API from '../../api';
import userContext from '../../contexts/userContext';
import NewClubForm from '../../forms/NewClubForm';
import { testClub1, testUserContext } from '../helpers/testHelpers';

jest.mock('../../api');

describe('NewClubForm', () => {
  const renderNewClubForm = () => {
    return render(
      <userContext.Provider value={testUserContext}>
        <NewClubForm />
      </userContext.Provider>
    )
  }

  beforeEach(() => {
    API.newClub.mockResolvedValue(testClub1);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderNewClubForm();
  });

  it('Renders consistently', () => {
    const { asFragment } = renderNewClubForm();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit on button press', async () => {
    const { getByText, getByLabelText } = renderNewClubForm();
    // Fill all required inputs
    const nameInput = getByLabelText('Name (Required)');
    const descriptionInput = getByLabelText('Description (Required)');
    fireEvent.change(nameInput, {target: {value: 'name'}});
    fireEvent.change(descriptionInput, {target: {value: 'description'}});
    await waitFor(() => {
      fireEvent.click(getByText('Create Club'));
      expect(API.newClub).toHaveBeenCalledWith({
        name: 'name',
        description: 'description',
        bannerImgUrl: '',
        isPublic: 'false',
        founder: testUserContext.user.username
      });
    });
  });

  it('Shows validation error when image is not URL, but not when it is empty', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, findByText, getByLabelText } = renderNewClubForm();
    const bannerInput = getByLabelText('Banner Image URL');
    fireEvent.change(bannerInput, {target: {value: 'bad'}});
    fireEvent.click(getByText('Create Club'));
    const error = await findByText("Invalid banner URL format", {exact: false});
    expect(error).toBeInTheDocument();

    // Then clears error when empty
    await waitFor(() => {
      fireEvent.change(bannerInput, {target: {value: ''}});
      expect(error).not.toBeInTheDocument();
    })
  });

  it('Shows validation error when name is greater than 30 characters', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, findByText, getByLabelText } = renderNewClubForm();
    const nameInput = getByLabelText('Name (Required)');
    fireEvent.change(nameInput, {target: {value: 'aksdkajsndkankdjsnkandkndjsankjdnkajn'}});
    fireEvent.click(getByText('Create Club'));
    const error = await findByText("Name must be less than 30 characters");
    expect(error).toBeInTheDocument();
  });

  it('Shows validation error when fields are empty', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, findAllByText } = renderNewClubForm();
    fireEvent.click(getByText('Create Club'));
    await findAllByText("This field is required");
  });

  it('Shows error on failed submit', async () => {
    API.newClub.mockImplementation(() => {throw new Error('Error')});
    const { getByText, getByLabelText, findByText } = renderNewClubForm();
    // Fill all required inputs
    const nameInput = getByLabelText('Name (Required)');
    const descriptionInput = getByLabelText('Description (Required)');
    fireEvent.change(nameInput, {target: {value: 'name'}});
    fireEvent.change(descriptionInput, {target: {value: 'description'}});
    fireEvent.click(getByText('Create Club'));
    const error = await findByText('Error');
    expect(error).toBeInTheDocument();
  });
});