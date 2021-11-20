import { render } from '@testing-library/react';
import ChosenAlbum from '../../posts/ChosenAlbum';
import { testSearchAlbum1 } from '../helpers/testHelpers';

describe('ChosenAlbum', () => {
  it('Renders successfully', () => {
    render(<ChosenAlbum album={testSearchAlbum1}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<ChosenAlbum album={testSearchAlbum1}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Adds class from passed classname', () => {
    const { container } = render(<ChosenAlbum album={testSearchAlbum1} className="class"/>);
    expect(container.firstChild).toHaveClass('class');
  });
})