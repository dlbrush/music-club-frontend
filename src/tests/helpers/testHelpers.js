import defaultBannerImg from './defaultBannerImg.jpeg';
import defaultProfileImg from './defaultProfileImg.jpeg';

export const testAuthContext = {
  login: jest.fn((creds) => creds),
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
    username: 'test3'
  },
  {
    username: 'test4'
  }
];

export const testUser = {
  username: 'test1',
  profileImgUrl: defaultProfileImg,
  invitations: [{
    username: 'test1',
    clubId: 1,
    sentFrom: 'test2'
  }],
  clubs: [
    testClub1,
    testClub2
  ]
};

export const testUser2 = {
  username: 'test2',
  profileImgUrl: defaultProfileImg,
  invitations: []
};

export const testUserContext = {
  user: testUser,
  editUser: jest.fn(user => user),
  deleteUserClub: jest.fn(club => club)
}