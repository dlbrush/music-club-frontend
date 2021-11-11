import AuthContext from '../contexts/authContext';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const [ failedSubmit, setFailedSubmit ] = useState('');
  const history = useHistory();

  const initialValues = {
    username: '',
    password: '',
    email: '',
    profileImgUrl: ''
  }

  const validate = values => {
    const errors = {};
    const urlPattern = /^https*:\/\//;
    const emailPattern = /.+@.+\..+/;
    if (values.username.length > 25) {
      errors.username = 'Username must be less than 25 characters';
    }
    if (values.email && !emailPattern.test(values.email)) {
      errors.email = 'Invalid email address format. Example: example@gmail.com'
    }
    // Only show error on URL if the user has input one, since it is not required
    if (values.profileImgUrl && !urlPattern.test(values.profileImgUrl)) {
      errors.profileImgUrl = 'Invalid profile URL format. URL must be valid. Example: http://example.com/example.jpg'
    }
    for (const value in values) {
      if (!values[value] && value !== 'profileImgUrl') {
        errors[value] = 'This field is required'
      }
    }
    return errors
  }

  const onSubmit = async (values, {setSubmitting}) => {
    // try to log in
    // on success, set user to returned user
    try {
      // Exclude profile image value if left blank
      console.log(values);
      if (!values.profileImgUrl) {
        delete values.profileImgUrl;
      }
      await register(values); 
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
          <label htmlFor="username" className="mt-2">Username (required)</label>
          <Field className="form-control" type="text" name="username"/>
          <ErrorMessage name="username" render={renderError}/>
          <label htmlFor="password" className="mt-2">Password (required)</label>
          <Field className="form-control" type="password" name="password"/>
          <ErrorMessage name="password" render={renderError}/>
          <label htmlFor="email" className="mt-2">Email Address (required)</label>
          <Field className="form-control" type="email" name="email" autoComplete="email"/>
          <ErrorMessage name="email" render={renderError}/>
          <label htmlFor="profileImgUrl" className="mt-2">Profile Image URL (Optional, default image will be provided if blank)</label>
          <Field className="form-control" type="text" name="profileImgUrl"/>
          <ErrorMessage name="profileImgUrl" render={renderError}/>
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm;