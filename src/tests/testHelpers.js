export const testUser = {
  username: 'test1',
  invitations: [{
    username: 'test1',
    clubId: 1,
    sentFrom: 'test2'
  }]
};

export const testUserContext = {
  user: testUser,
  editUser: jest.fn((user) => user)
}

export const testAuthContext = {
  login: jest.fn((creds) => creds),
  logout: jest.fn(() => true)
}