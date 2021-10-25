// Organizes all of the routes into arrays to create nav links and routes
const directory = {
  unauth: [
    {
      name: 'Home',
      route: '/',
      nav: true
      // component: Splash
    },
    {
      name: 'Register',
      route: '/register',
      nav: true
      // component: Register
    },
    {
      name: 'Log in',
      route: '/login',
      nav: true
      // component: Login
    }
  ],
  auth: [
    {
      name: 'Home',
      route: '/',
      nav: true
      // component: Home
    },
    {
      name: 'My Clubs',
      route: '/my-clubs'
    }
  ]
}

export default directory;