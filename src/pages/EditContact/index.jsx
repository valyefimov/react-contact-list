// @flow
import React, { PureComponent, Fragment } from 'react';
import classNames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';

import Layout from '../../components/Layout';
import contactsService from '../../services/contacts';
import styles from './style.module.css';
import type { Contact } from '../../types/contact';

type Props = {
  match: {
    params: {
      id: string,
    },
  },
  history: {
    push: (url: string) => void,
  },
};
type State = {
  contact?: Contact,
  isSubmitting: boolean,
};

class EditContact extends PureComponent<Props, State> {
  state: State = {
    isSubmitting: false,
  };

  async componentWillMount() {
    document.title = 'Edit contact';

    const contacts = await contactsService.findContacts();
    const contact = contacts.find(contact => contact.id === this.props.match.params.id);

    if (contact) {
      this.setState({ contact });
    } else {
      this.props.history.push('/');
    }
  }

  validate(values: Object) {
    let errors = {};

    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!values.phone) {
      errors.phone = 'Phone number is required';
    }

    return errors;
  }

  setSubmitting = () => this.setState({ isSubmitting: true });

  handleSubmit = async values => {
    const { id } = this.props.match.params;
    await contactsService.editContact(id, {
      name: `${values.firstName} ${values.lastName}`,
      phone: values.phone,
    });

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
    const { isSubmitting, contact } = this.state;

    if (!contact) {
      return <div>Loading...</div>;
    }

    const [firstName, ...lastName] = contact.name.split(' ');

    const initialValues = {
      firstName: firstName,
      lastName: lastName.join(' '),
      phone: contact.phone,
    };

    return (
      <Formik validate={this.validate} initialValues={initialValues} onSubmit={this.handleSubmit}>
        {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Layout title="Edit contact" buttons={this.renderButtons()}>
              <div>
                <div className="row">
                  <div className="form-group col-5">
                    <label htmlFor="full-name">First name</label>
                    <input
                      autoFocus
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      value={values.firstName}
                      onBlur={handleBlur}
                      className={classNames('form-control', {
                        'is-invalid': isSubmitting && errors.firstName,
                      })}
                      id="first-name"
                    />
                    {errors.firstName && isSubmitting && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="form-group col-5">
                    <label htmlFor="full-name">Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      onBlur={handleBlur}
                      className={classNames('form-control', {
                        'is-invalid': isSubmitting && errors.lastName,
                      })}
                      id="last-name"
                    />
                    {errors.lastName && isSubmitting && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-5">
                    <label htmlFor="phone">Phone number</label>
                    <input
                      type="tel"
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                      className={classNames('form-control', {
                        'is-invalid': errors.phone && isSubmitting,
                      })}
                      id="phone"
                    />
                    {errors.phone && isSubmitting && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>
              </div>
            </Layout>
          </form>
        )}
      </Formik>
    );
  }
}

export default withRouter(EditContact);
