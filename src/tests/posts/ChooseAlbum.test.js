import { fireEvent, render } from '@testing-library/react';
import API from '../../api';
import ChooseAlbum from '../../posts/ChooseAlbum';
import { testSearchAlbum1, testSearchAlbum2 } from '../helpers/testHelpers';

jest.mock('../../api');

describe('ChooseAlbum', () => {
  let mockSetAlbumChoice;

  beforeEach(() => {
    API.albumSearch.mockResolvedValue([testSearchAlbum1, testSearchAlbum2]);
    mockSetAlbumChoice = jest.fn(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    render(<ChooseAlbum setAlbumChoice={mockSetAlbumChoice}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<ChooseAlbum setAlbumChoice={mockSetAlbumChoice}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Populates album results on search', async () => {
    const { getByText, findByText } = render(<ChooseAlbum setAlbumChoice={mockSetAlbumChoice}/>);
    const searchButton = getByText('Search');
    fireEvent.click(searchButton);
    const album1 = await findByText(testSearchAlbum1.title);
    const album2 = await findByText(testSearchAlbum2.title);
    expect(album1).toBeInTheDocument();
    expect(album2).toBeInTheDocument();
  });

  it('Shows message when no album checked after search', async () => {
    const { getByText, findByText } = render(<ChooseAlbum setAlbumChoice={mockSetAlbumChoice}/>);
    const searchButton = getByText('Search');
    fireEvent.click(searchButton);
    await findByText('Choose an album before continuing');
  });

  it('Allows you to choose an album when album is checked', async () => {
    const { getByText, findByText, getByTestId } = render(<ChooseAlbum setAlbumChoice={mockSetAlbumChoice}/>);
    const searchButton = getByText('Search');
    fireEvent.click(searchButton);
    const album1 = await findByText(testSearchAlbum1.title);
    fireEvent.click(album1);
    expect(getByTestId('album-1-radio')).toBeChecked();
    const nextButton = await findByText('Next');
    fireEvent.click(nextButton);
    expect(mockSetAlbumChoice).toHaveBeenCalledWith(testSearchAlbum1);
  });
})