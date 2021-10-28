import AuthContext from './contexts/authContext';

import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = () => {
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
    // redirect to 
  }

  return (
    <Formik initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
    >
      <Form>
        
      </Form>
    </Formik>
  )
}

export default LoginForm;