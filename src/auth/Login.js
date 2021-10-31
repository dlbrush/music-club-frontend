import LoginForm from '../forms/LoginForm';

const Login = () => {
  return (
    <main className="Login col-md-9 col-lg-10">
      <h1 className="border-bottom border-dark mt-4 pb-2">
        Log in
      </h1>
      <LoginForm />
    </main>
  )
}

export default Login;