import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router';

import API from '../api';
import DeletePostButton from '../posts/DeletePostButton';

const EditPostForm = ({ post }) => {
  const [ failedSubmit, setFailedSubmit ] = useState('');
  const history = useHistory();

  const initialValues = {
    content: post.content,
    recTracks: post.recTracks
  }

  const onSubmit = async (values, {setSubmitting}) => {
    try {
      await API.editPost(post.id, values);
      history.push(`/clubs/${post.clubId}/posts/${post.id}`)
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
        <Form>
          {failedSubmit && <div className="alert alert-danger">{failedSubmit}</div>}
          <label htmlFor="content" className="mt-2">Say something about this album</label>
          <Field id="content" as="textarea" className="form-control" name="content"/>
          <label htmlFor="recTracks" className="mt-2">Recommended tracks</label>
          <Field id="recTracks" className="form-control mb-3" type="text" name="recTracks"/>
          <button type="submit" className="btn btn-primary me-3" disabled={isSubmitting}>Edit Post</button>
          <DeletePostButton clubId={post.clubId} postId={post.id} />
        </Form>
      )}
    </Formik>
  )
}

export default EditPostForm;