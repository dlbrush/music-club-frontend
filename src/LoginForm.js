import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = () => {
  const initialValues = {
    username: '',
    password: '',
  }

  const validate = values => {
    const errors = {};
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