import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router';

const EditClubForm = ({ club, editClub }) => {
  const [ failedSubmit, setFailedSubmit ] = useState('');
  const history = useHistory();

  const { name, description, bannerImgUrl } = club;
  const initialValues = { name, description, bannerImgUrl };

  const validate = values => {
    const errors = {};
    const urlPattern = /^https*:\/\//;
    if (values.name.length > 30) {
      errors.name = 'Name must be less than 30 characters';
    }
    // Only show error on URL if the user has input one, since it is not required
    if (values.bannerImgUrl && !urlPattern.test(values.bannerImgUrl)) {
      errors.bannerImgUrl = 'Invalid banner URL format. URL must be valid. Example: http://example.com/example.jpg'
    }
    for (const value in values) {
      if (!values[value] && value !== 'bannerImgUrl') {
        errors[value] = 'This field is required'
      }
    }
    return errors
  }

  const onSubmit = async (values, {setSubmitting}) => {
    try {
      await editClub(values);
      history.push(`/clubs/${club.id}`)
    } catch(e) {
      setFailedSubmit(e.message);
      setSubmitting(false);
    }
  }

  const renderError = msg => <div className="mt-1 text-danger">{msg}</div>

  return (
    <Formik initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
    >
      {({ isSubmitting }) => (
        <Form>
          {failedSubmit && <div className="alert alert-danger">{failedSubmit}</div>}
          <label htmlFor="name" className="mt-2">Name</label>
          <Field type="text" className="form-control" name="name"/>
          <ErrorMessage name="name" render={renderError}/>
          <label htmlFor="bannerImgUrl" className="mt-2">Banner Image URL:</label>
          <Field id="bannerImgUrl" type="text" className="form-control" name="bannerImgUrl"/>
          <ErrorMessage name="bannerImgUrl" render={renderError}/>
          <label htmlFor="description" className="mt-2">Description</label>
          <Field as="textarea" className="form-control" name="description"/>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>Update Club</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditClubForm;