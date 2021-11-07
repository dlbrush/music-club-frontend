import { Formik, Form, Field } from 'formik';
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
      setSubmitting(false);
    }
  }

  return (
    <Formik initialValues={initialValues}
            onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="CommentForm row bg-primary bg-opacity-25 p-2 align-items-center justify-content-center border-top border-bottom">
          {failedSubmit && <div className="alert alert-danger">{failedSubmit}</div>}
          <div className="col-10">
            <label htmlFor="comment">Add Comment:</label>
            <Field type="text" as="textarea" className="form-control" name="comment"/>
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