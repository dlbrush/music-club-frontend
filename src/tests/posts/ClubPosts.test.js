import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import API from '../../api';
import ClubPosts from '../../posts/ClubPosts';
import { testPost1, testPost2, testClub1 } from '../helpers/testHelpers';

jest.mock('../../api');


describe('ClubPosts', () => {
  beforeEach(() => {
    API.getClubPosts.mockResolvedValue([testPost1, testPost2]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    render(<MemoryRouter><ClubPosts club={testClub1} /></MemoryRouter>);
  });

  it('Renders consistently (after loading)', async () => {
    const { asFragment, findByText } = render(<MemoryRouter><ClubPosts club={testClub1} /></MemoryRouter>);
    await findByText('"content"');
    expect(asFragment()).toMatchSnapshot();
  });

  it('Returns loading message initially', () => {
    const { getByText } = render(<MemoryRouter><ClubPosts club={testClub1} /></MemoryRouter>);
    getByText('Loading posts...');
  });

  it('Shows error message if loading fails', async () => {
    API.getClubPosts.mockImplementation(() => {throw new Error('Error')});
    const { findByText } = render(<MemoryRouter><ClubPosts club={testClub1} /></MemoryRouter>);
    await findByText('Unable to load posts: Error');
  });

  it('Shows both posts after loading', async () => {
    const { findByText } = render(<MemoryRouter><ClubPosts club={testClub1} /></MemoryRouter>);
    await findByText('"content"');
    await findByText('"more content"');
  });

  it('Shows message if no posts', async () => {
    API.getClubPosts.mockResolvedValue([]);
    const { findByText } = render(<MemoryRouter><ClubPosts club={testClub1} /></MemoryRouter>);
    await findByText('No posts yet!');
  });
});