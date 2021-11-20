import { fireEvent, render } from '@testing-library/react';
import AlbumSearchResult from '../../posts/AlbumSearchResult';
import { testSearchAlbum1, testSearchAlbum2 } from '../helpers/testHelpers';

describe('AlbumSearchResult', () => {
  let mockSetCheckedAlbum;

  beforeEach(() => {
    mockSetCheckedAlbum = jest.fn(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('Renders successfully', () => {
    render(<AlbumSearchResult album={testSearchAlbum1} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={null}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } =  render(<AlbumSearchResult album={testSearchAlbum1} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={null}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders checked when the checkedAlbum matches the passed album prop', () => {
    const { getByTestId } =  render(<AlbumSearchResult album={testSearchAlbum1} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={testSearchAlbum1}/>);
    expect(getByTestId('album-1-radio')).toBeChecked();
  });

  it('Renders unchecked when the checkedAlbum does not match the passed album prop', () => {
    const { getByTestId } =  render(<AlbumSearchResult album={testSearchAlbum1} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={testSearchAlbum2}/>);
    expect(getByTestId('album-1-radio')).not.toBeChecked();
  });

  it('Calls setCheckedAlbum for the current album on click when not checked', () => {
    const { getByText } = render(<AlbumSearchResult album={testSearchAlbum1} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={testSearchAlbum2}/>);
    const text = getByText(testSearchAlbum1.year);
    fireEvent.click(text);
    expect(mockSetCheckedAlbum).toHaveBeenCalledWith(testSearchAlbum1);
  });

  it('Calls setCheckedAlbum with null when item is already checked', () => {
    const { getByText } = render(<AlbumSearchResult album={testSearchAlbum1} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={testSearchAlbum1}/>);
    const text = getByText(testSearchAlbum1.year);
    fireEvent.click(text);
    expect(mockSetCheckedAlbum).toHaveBeenCalledWith(null);
  });
});