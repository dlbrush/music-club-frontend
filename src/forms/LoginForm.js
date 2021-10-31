import AuthContext from '../contexts/authContext';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [ failedSubmit, setFailedSubmit ] = useState('');
  const history = useHistory();

  const initialValues = {
    username: '',
    password: '',
  }

  const validate = values => {
    const errors = {};
    if (values.username.length > 25) {
      errors.username = 'Username must be less than 25 characters';
    }
    for (const value in values) {
      if (!values[value]) {
        errors[value] = 'This field is required'
      }
    }
    return errors
  }

  const onSubmit = async (values, {setSubmitting}) => {
    // try to log in
    // on success, set user to returned user
    try {
      await login(values); 
      history.push('/');
    } catch(e) {
      setFailedSubmit(e.message);
    }
    setSubmitting(false);
  }

  const renderError = msg => <div className="text-danger">{msg}</div>

  return (
    <Formik initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>

          {failedSubmit && <div className="alert alert-danger">{failedSubmit}</div>}
          <label htmlFor="username">Username</label>
          <Field className="form-control" type="text" name="username"/>
          <ErrorMessage name="username" render={renderError}/>
          <label htmlFor="password">Password</label>
          <Field className="form-control" type="password" name="password"/>
          <ErrorMessage name="password" render={renderError}/>
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Log in</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm;