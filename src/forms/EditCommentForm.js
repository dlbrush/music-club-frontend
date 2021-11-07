import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

import API from '../api';

const EditCommentForm = ({ comment, editComment, setEditMode }) => {
  const [ failedSubmit, setFailedSubmit ] = useState('');

  const initialValues = {
    comment: comment.comment
  }

  const onSubmit = async (values, {setSubmitting}) => {
    try {
      const editedComment = await API.editComment(comment.id, values);
      // API route does not return user data, attach existing
      editedComment.user = comment.user;
      editComment(editedComment);
      setEditMode(false);
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
        <Form className="CommentForm row p-2 align-items-center justify-content-center">
          {failedSubmit && <div className="alert alert-danger">{failedSubmit}</div>}
          <div className="col-10">
            <label htmlFor="comment">Edit Comment:</label>
            <Field as="textarea" className="form-control" name="comment"/>
          </div>
          <div className="col-2 jutify-content-center">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Update</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditCommentForm;