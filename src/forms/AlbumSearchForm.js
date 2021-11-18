import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import API from '../api';

const AlbumSearchForm = ({ setSearchResults }) => {
  const [ failedSubmit, setFailedSubmit ] = useState('');

  const initialValues = {
    artist: '',
    title: '',
  }

  const onSubmit = async (values, {setSubmitting, resetForm}) => {
    try {
      const albums = await API.albumSearch(values.title, values.artist); 
      setSearchResults(albums);
      resetForm(initialValues);
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
        <Form className="row">
          {failedSubmit && <div className="alert alert-danger col-12">{failedSubmit}</div>}
          <div className="col-5">
            <label htmlFor="title">Title</label>
            <Field className="form-control" type="text" name="title" id="title"/>
          </div>
            <div className="col-5">
            <label htmlFor="artist">Artist</label>
            <Field id="artist" className="form-control" type="text" name="artist"/>
          </div>
          <div className="col-2 align-self-end">
            <button type="submit" className="btn btn-primary " disabled={isSubmitting}>Search</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AlbumSearchForm;