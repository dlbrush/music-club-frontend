import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';

import API from '../api';
import UserContext from '../contexts/userContext';

const NewClubForm = () => {
  const [ failedSubmit, setFailedSubmit ] = useState('');
  const history = useHistory();
  const user = useContext(UserContext);

  const initialValues = {
    name: '',
    description: '',
    bannerImgUrl: '',
    isPublic: "false"
  }

  const validate = values => {
    const errors = {};
    const imgUrlPattern = /^https*:\/\/.+\/.+(.jpg|.jpeg|.png|.gif)/;
    if (values.name.length > 30) {
      errors.name = 'Name must be less than 30 characters';
    }
    // Only show error on URL if the user has input one, since it is not required
    if (values.bannerImgUrl && !imgUrlPattern.test(values.bannerImgUrl)) {
      errors.imgUrlPattern = 'Invalid banner URL format. URL must point to a valid .jpg, .jpeg, .png, or .gif file. Example: http://example.com/example.jpg'
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
      values.founder = user.username;
      const newClub = await API.newClub(values);
      history.push(`/clubs/${newClub.id}/posts`);
    } catch(e) {
      setFailedSubmit(e.message);
    }
    setSubmitting(false);
  }

  const renderError = msg => <div className="mt-1 text-danger">{msg}</div>

  return (
    <Formik initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
    >
      {({ isSubmitting, values }) => (
        <Form>
          {failedSubmit && <div className="alert alert-danger">{failedSubmit}</div>}
          <label htmlFor="name" className="mt-2">Name</label>
          <Field type="text" className="form-control" name="name"/>
          <ErrorMessage name="name" render={renderError}/>
          <label htmlFor="bannerImgUrl" className="mt-2">Banner Image URL:</label>
          <Field type="text" className="form-control" name="bannerImgUrl"/>
          <ErrorMessage name="bannerImgUrl" render={renderError}/>
          <label htmlFor="description" className="mt-2">Description</label>
          <Field as="textarea" className="form-control" name="description"/>
          <fieldset className="mt-3" role="group">
            <legend>Set club privacy</legend>
            <p id="describe-public">Public clubs will be shown to all users. Any user can join.</p>
            <label className="me-4">
              <Field type="radio" className="form-check-input me-1" name="isPublic" id="private" value="false" checked={values.isPublic === 'false'} />
              Private
            </label>
            <label>
              <Field type="radio" className="form-check-input me-1" name="isPublic" id="public" value="true" checked={values.isPublic === 'true'} />
              Public
            </label>
          </fieldset>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>Create Club</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default NewClubForm;