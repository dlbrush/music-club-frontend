import { fireEvent, render, waitFor } from '@testing-library/react';
import API from '../../api';
import AlbumSearchForm from '../../forms/AlbumSearchForm';

jest.mock('../../api');

describe('AlbumSearchForm', () => {
  let mockSetSearchResults;

  beforeEach(() => {
    mockSetSearchResults = jest.fn(() => true);
    API.albumSearch.mockResolvedValue(['album1', 'album2']);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    render(<AlbumSearchForm setSearchResults={mockSetSearchResults}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<AlbumSearchForm setSearchResults={mockSetSearchResults}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit then clears form on button press', async () => {
    const { getByText, getByLabelText } = render(<AlbumSearchForm setSearchResults={mockSetSearchResults}/>);
    const titleInput = getByLabelText('Title');
    const artistInput = getByLabelText('Artist');
    fireEvent.change(titleInput, {target: {value: 'title'}});
    fireEvent.change(artistInput, {target: {value: 'artist'}});
    await waitFor(() => {
      fireEvent.click(getByText('Search'));
      expect(API.albumSearch).toHaveBeenCalledWith('title', 'artist');
      expect(mockSetSearchResults).toHaveBeenCalledWith(['album1', 'album2']);
      expect(titleInput).toHaveValue('');
      expect(artistInput).toHaveValue('');
    });
  });

  it('Shows error on failed submit', async () => {
    API.albumSearch.mockImplementation(() => {throw new Error('Error')});
    const { getByText, findByText } = render(<AlbumSearchForm setSearchResults={mockSetSearchResults}/>);
    fireEvent.click(getByText('Search'));
    const error = await findByText('Error');
    expect(error).toBeInTheDocument();
  });
});