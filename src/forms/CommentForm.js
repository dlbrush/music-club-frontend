import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';

import API from '../api';

const CommentForm = ({ postId, addComment }) => {
  const [ failedSubmit, setFailedSubmit ] = useState('');

  const initialValues = {
    comment: ''
  }

  const onSubmit = async (values, {setSubmitting}) => {
    try {
      const newComment = await API.newComment(postId, values);
      addComment(newComment);
    } catch(e) {
      setFailedSubmit(e.message);
    }
    setSubmitting(false);
  }

  const validate = values => {
    const errors = {};
    if (!values.comment) {
      errors.comment = "Can't submit empty comment"
    }
    return errors
  }

  const renderError = msg => <div className="mt-1 text-danger">{msg}</div>

  return (
    <Formik initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Form className="CommentForm row bg-primary bg-opacity-25 p-2 align-items-center justify-content-center border-top border-bottom">
          {failedSubmit && <div className="alert alert-danger">{failedSubmit}</div>}
          <div className="col-10">
            <label htmlFor="comment">Add Comment:</label>
            <Field type="text" as="textarea" className="form-control" id="comment"  name="comment"/>
            <ErrorMessage name="comment" render={renderError}/>
          </div>
          <div className="col-2">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Comment</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CommentForm;