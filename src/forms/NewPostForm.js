import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';

import API from '../api';

const NewPostForm = ({ discogsId }) => {
  const [ failedSubmit, setFailedSubmit ] = useState('');
  const { clubId } = useParams();
  const history = useHistory();

  const initialValues = {
    content: '',
    recTracks: '',
    discogsId
  }

  const onSubmit = async (values, {setSubmitting}) => {
    try {
      const newPost = await API.newPost(clubId, values);
      history.push(`/clubs/${clubId}/posts`)
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
          <Field as="textarea" className="form-control" name="content"/>
          <label htmlFor="recTracks" className="mt-2">Recommended tracks</label>
          <Field className="form-control" type="text" name="recTracks"/>
          <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>Post</button>
        </Form>
      )}
    </Formik>
  )
}

export default NewPostForm;