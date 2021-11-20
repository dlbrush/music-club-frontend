import defaultBannerImg from './defaultBannerImg.jpeg';
import defaultProfileImg from './defaultProfileImg.jpeg';

export const testAuthContext = {
  login: jest.fn((creds) => creds),
  register: jest.fn((creds) => creds),
  logout: jest.fn(() => true)
}

export const testClub1 = {
  name: 'Club',
  id: 1,
  description: 'In da club',
  bannerImgUrl: defaultBannerImg,
  members: [
    {
      username: 'test1',
      profileImgUrl: defaultProfileImg
    },
    {
      username: 'test2',
      profileImgUrl: defaultProfileImg
    }
  ]
}

export const testClub2 = {
  name: 'Club 2',
  id: 2,
  description: 'Better club',
  bannerImgUrl: defaultBannerImg,
  members: [
    {
      username: 'test1',
      profileImgUrl: defaultProfileImg
    }
  ]
}

export const testInvitations = [
  {
    username: 'test3',
    clubId: 1,
    club: testClub1,
    sentFrom: 'test1'
  },
  {
    username: 'test4',
    clubId: 2,
    club: testClub2,
    sentFrom: 'test1'
  }
];

export const testUser = {
  username: 'test1',
  profileImgUrl: defaultProfileImg,
  email: 'test@test.com',
  invitations: [{
    username: 'test1',
    clubId: 1,
    sentFrom: 'test2',
    club: testClub1
  }],
  clubs: [
    testClub1,
    testClub2
  ]
};

export const testUser2 = {
  username: 'test2',
  email: 'test2@test.com',
  profileImgUrl: defaultProfileImg,
  invitations: []
};

export const testUserContext = {
  user: testUser,
  editUser: jest.fn(user => user),
  addClub: jest.fn(club => club),
  removeInvitation: jest.fn(clubId => clubId),
  deleteUserClub: jest.fn(club => club)
}

export const testComment1 = {
  username: 'test1',
  comment: 'comment',
  postId: 1,
  id: 1,
  user: testUser
}

export const testComment2 = {
  username: 'test2',
  comment: 'comment again',
  postId: 1,
  id: 2,
  user: testUser2
}

export const testPost1 = {
  content: 'content',
  recTracks: 'recTracks',
  id: 1,
  clubId: 1
}

export const testAlbum1 = {
  coverImgUrl: defaultProfileImg,
  title: 'Album',
  year: 2000
}

export const testAlbum2 = {
  coverImgUrl: defaultProfileImg,
  title: 'Album 2',
  year: 2002
}