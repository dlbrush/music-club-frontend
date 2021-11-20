import { getByText, render } from '@testing-library/react';
import AlbumSearchResult from '../../posts/AlbumSearchResult';
import { testAlbum1, testAlbum2 } from '../helpers/testHelpers';

describe('AlbumSearchResult', () => {
  let mockSetCheckedAlbum;

  beforeEach(() => {
    mockSetCheckedAlbum = jest.fn(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('Renders successfully', () => {
    render(<AlbumSearchResult album={testAlbum1} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={null}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } =  render(<AlbumSearchResult album={testAlbum1} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={null}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders checked when the checkedAlbum matches the passed album prop', () => {
    const { getByTestId } =  render(<AlbumSearchResult album={testAlbum1} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={testAlbum1}/>);
    expect(getByTestId('album-radio')).toBeChecked();
  })
});