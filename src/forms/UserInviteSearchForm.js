import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

const UserInviteSearchForm = ({ searchUsers }) => {
  const [ failedSubmit, setFailedSubmit ] = useState('');

  const initialValues = {
    username: ''
  }

  const onSubmit = async (values, {setSubmitting}) => {
    try {
      await searchUsers(values.username);
    } catch(e) {
      setFailedSubmit(e.message);
    }
    setSubmitting(false);
  }

  return (
    <Formik initialValues={initialValues}
            onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="CommentForm row bg-primary bg-opacity-25 p-2 align-items-center justify-content-center border-top border-bottom">
          {failedSubmit && <div className="alert alert-danger">{failedSubmit}</div>}
          <div className="col-2">
            <label htmlFor="username">Search username:</label>
          </div>
          <div className="col-8">
            <Field type="text" className="form-control" name="username"/>
          </div>
          <div className="col-2">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Search</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default UserInviteSearchForm;