import { render } from '@testing-library/react';
import AlbumSearchResultList from '../../posts/AlbumSearchResultList';
import { testSearchAlbum1, testSearchAlbum2 } from '../helpers/testHelpers';

describe('AlbumSearchResultList', () => {
  let mockSetCheckedAlbum;

  beforeEach(() => {
    mockSetCheckedAlbum = jest.fn(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('Renders successfully', () => {
    render(<AlbumSearchResultList searchResults={[testSearchAlbum1, testSearchAlbum2]} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={testSearchAlbum1}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<AlbumSearchResultList searchResults={[testSearchAlbum1, testSearchAlbum2]} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={testSearchAlbum1}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders checked for item passed with checked album', () => {
    const { getByTestId } = render(<AlbumSearchResultList searchResults={[testSearchAlbum1, testSearchAlbum2]} setCheckedAlbum={mockSetCheckedAlbum} checkedAlbum={testSearchAlbum1}/>);
    expect(getByTestId('album-1-radio')).toBeChecked();
    expect(getByTestId('album-2-radio')).not.toBeChecked();
  });
});