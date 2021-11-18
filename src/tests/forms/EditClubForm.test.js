import { fireEvent, render, waitFor } from '@testing-library/react';
import EditClubForm from '../../forms/EditClubForm';
import { testClub1 } from '../helpers/testHelpers';

jest.mock('../../api');

describe('EditClubForm', () => {
  let mockEditClub;

  beforeEach(() => {
    mockEditClub = jest.fn(() => true);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    render(<EditClubForm editClub={mockEditClub} club={testClub1}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<EditClubForm editClub={mockEditClub} club={testClub1}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit on button press', async () => {
    const { getByText, getByLabelText } = render(<EditClubForm editClub={mockEditClub} club={testClub1}/>);
    // Banner needs URL input
    const bannerInput = getByLabelText('Banner Image URL:');
    fireEvent.change(bannerInput, {target: {value: 'http://example.com/example.jpg'}});
    await waitFor(() => {
      fireEvent.click(getByText('Update Club'));
      expect(mockEditClub).toHaveBeenCalledWith({
        name: testClub1.name,
        description: testClub1.description,
        bannerImgUrl: 'http://example.com/example.jpg'
      });
    });
  });

  it('Shows validation error when image is not URL, but not when it is empty', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, findByText, getByLabelText } = render(<EditClubForm editClub={mockEditClub} club={testClub1}/>);
    fireEvent.click(getByText('Update Club'));
    const error = await findByText("Invalid banner URL format", {exact: false});
    expect(error).toBeInTheDocument();

    // Then clears error when blank - wrap in waitFor to wait for operations to clear
    await waitFor(() => {
      const bannerInput = getByLabelText('Banner Image URL:');
      fireEvent.change(bannerInput, {target: {value: ''}});
      expect(error).not.toBeInTheDocument();
    })
  });

  it('Shows validation error when name is greater than 30 characters', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, findByText, getByLabelText } = render(<EditClubForm editClub={mockEditClub} club={testClub1}/>);
    const nameInput = getByLabelText('Name');
    fireEvent.change(nameInput, {target: {value: 'aksdkajsndkankdjsnkandkndjsankjdnkajn'}});
    fireEvent.click(getByText('Update Club'));
    const error = await findByText("Name must be less than 30 characters");
    expect(error).toBeInTheDocument();
  });

  it('Shows validation error when description is empty', async () => {
    // Shows error on submit because current input is invalid
    const { getByText, findByText, getByLabelText } = render(<EditClubForm editClub={mockEditClub} club={testClub1}/>);
    const descriptionInput = getByLabelText('Description');
    fireEvent.change(descriptionInput, {target: {value: ''}});
    fireEvent.click(getByText('Update Club'));
    const error = await findByText("This field is required");
    expect(error).toBeInTheDocument();
  });

  it('Shows error on failed submit', async () => {
    mockEditClub.mockImplementation(() => {throw new Error('Error')});
    const { getByText, getByLabelText, findByText } = render(<EditClubForm editClub={mockEditClub} club={testClub1}/>);
    const bannerInput = getByLabelText('Banner Image URL:');
    fireEvent.change(bannerInput, {target: {value: 'http://example.com/example.jpg'}});
    fireEvent.click(getByText('Update Club'));
    const error = await findByText('Error');
    expect(error).toBeInTheDocument();
  });
});