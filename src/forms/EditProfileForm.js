import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext, useState } from 'react';

import UserContext from '../contexts/userContext';
import API from '../api';

// Note that profile img is required in this form where it's optional on registration - We can provide a default on registration but can't let the user nullify their existing profile image
const EditProfileForm = () => {
  const { user, editUser } = useContext(UserContext);
  const [ failedSubmit, setFailedSubmit ] = useState('');
  const [ successSubmit, setSuccessSubmit ] = useState(false);

  const initialValues = {
    email: user.email,
    profileImgUrl: user.profileImgUrl
  }

  const validate = values => {
    const errors = {};
    const imgUrlPattern = /^https*:\/\/.+\/.+((.jpg|.jpeg|.png|.gif)$)/;
    const emailPattern = /.+@.+\..+/;
    if (values.email && !emailPattern.test(values.email)) {
      errors.email = 'Invalid email address format. Example: example@gmail.com'
    }
    // Only show error on URL if the user has input one, since it is not required
    if (values.profileImgUrl && !imgUrlPattern.test(values.profileImgUrl)) {
      errors.profileImgUrl = 'Invalid profile URL format. URL must point to a valid .jpg, .jpeg, .png, or .gif file. Example: http://example.com/example.jpg'
    }
    for (const value in values) {
      if(!values[value]) {
        errors[value] = 'This field is required.';
      }
    }
    return errors
  }

  const onSubmit = async (values, {setSubmitting}) => {
    setSuccessSubmit(false);
    try {
      // Don't include profile img if empty
      if (!values.profileImgUrl) {
        delete values.profileImgUrl;
      }
      const { email, profileImgUrl } = await API.editUser(user.username, values);
      await editUser(email, profileImgUrl);
      setSuccessSubmit(true);
    } catch(e) {
      setFailedSubmit(e.message);
    }
    setSubmitting(false);
  }

  const renderError = msg => <div className="text-danger">{msg}</div>

  return (
    <Formik initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {failedSubmit && <div className="alert alert-danger">{failedSubmit}</div>}
          {successSubmit && <div className="alert alert-success">Successfully updated your profile.</div>}
          <label htmlFor="email" className="mt-2">Email Address (required)</label>
          <Field className="form-control" type="email" name="email" autoComplete="email"/>
          <ErrorMessage name="email" render={renderError}/>
          <label htmlFor="profileImgUrl" className="mt-2">Profile Image URL (Required)</label>
          <Field className="form-control" type="text" name="profileImgUrl"/>
          <ErrorMessage name="profileImgUrl" render={renderError}/>
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Update profile</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditProfileForm;