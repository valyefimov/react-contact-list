// @flow
import React, { PureComponent, Fragment } from 'react';
import classNames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';

import Layout from '../../components/Layout';
import contacts from '../../services/contacts';
import styles from './style.module.css';

type Props = {
  history: {
    push: (url: string) => void,
  },
};
type State = {
  isSubmitting: boolean,
};

class CreactContact extends PureComponent<Props, State> {
  state: State = {
    isSubmitting: false,
  };

  componentWillMount() {
    document.title = 'Create contact';
  }

  validate(values: Object) {
    let errors = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.phone) {
      errors.phone = 'Phone number is required';
    }

    return errors;
  }

  setSubmitting = () => this.setState({ isSubmitting: true });

  handleSubmit = async values => {
    await contacts.createContact(values);

    this.props.history.push('/');
  };

  renderButtons() {
    return (
      <Fragment>
        <Link to="/" className={classNames('btn py-2 px-4 mr-2', styles.btnCancel)}>
          Cancel
        </Link>
        <button type="submit" onClick={this.setSubmitting} className={classNames('btn btn-light py-2 px-5')}>
          Save
        </button>
      </Fragment>
    );
  }

  render() {
    const { isSubmitting } = this.state;

    return (
      <Formik validate={this.validate} onSubmit={this.handleSubmit}>
        {({ errors, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Layout title="Create contact" buttons={this.renderButtons()}>
              <div className="row">
                <div className="form-group col-5">
                  <label htmlFor="full-name">Full name</label>
                  <input
                    autoFocus
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={classNames('form-control', {
                      'is-invalid': isSubmitting && errors.name,
                    })}
                    id="full-name"
                  />
                  {errors.name && isSubmitting && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="form-group col-5">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={classNames('form-control', {
                      'is-invalid': errors.phone && isSubmitting,
                    })}
                    id="phone"
                  />
                  {errors.phone && isSubmitting && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
              </div>
            </Layout>
          </form>
        )}
      </Formik>
    );
  }
}

export default withRouter(CreactContact);
