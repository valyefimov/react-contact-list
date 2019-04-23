// @flow
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import contactsService from '../../services/contacts';
import styles from './style.module.css';
import type { Contact } from '../../types/contact';

type Props = {};
type State = {
  order: number,
  initialized: boolean,
  contacts: Contact[],
};

class ContactList extends PureComponent<Props, State> {
  state: State = {
    initialized: false,
    order: 1,
    contacts: [],
  };

  async componentWillMount() {
    document.title = 'Contacts';
    await this.loadContacts();

    this.setState({ initialized: true });
  }

  async loadContacts() {
    const { order } = this.state;
    const contacts = await contactsService.findContacts();

    contacts.sort((a, b) => {
      if (a.name > b.name) {
        return order ? 1 : -1;
      } else {
        return !order ? 1 : -1;
      }
    });

    return this.setState({ contacts });
  }

  handleDelete = async (event: SyntheticEvent<HTMLInputElement>) => {
    await contactsService.deleteContact(event.currentTarget.dataset.id);

    this.loadContacts();
  };

  toggleOrder = () => {
    const { order } = this.state;

    this.setState({ order: +!order }, this.loadContacts);
  };

  renderButtons() {
    return (
      <Link to="/create" className="btn btn-light py-2 px-5">
        Create
      </Link>
    );
  }

  renderTableRows() {
    const { contacts } = this.state;

    if (!contacts.length) {
      return (
        <tr>
          <td colSpan="2">No contacts found</td>
        </tr>
      );
    }

    return (contacts: any).map(contact => (
      <tr className={styles.row} key={contact.id}>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td className={styles.editCell}>
          <Link to={`/edit/${contact.id}`} className="btn btn-link p-0">
            Edit
          </Link>
        </td>
        <td className={styles.deleteCell}>
          <button className="btn btn-link p-0 text-danger" data-id={contact.id} onClick={this.handleDelete}>
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    const { initialized, order, contacts } = this.state;
    const subTitle = contacts.length ? `Showing ${contacts.length} contact(s)` : null;

    if (!initialized) {
      return null;
    }

    return (
      <Layout title="Contacts" subTitle={subTitle} buttons={this.renderButtons()}>
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th className={classNames('border-top-0 sortable')} scope="col" onClick={this.toggleOrder}>
                Name <i className={classNames('fas', { 'fa-caret-up': order, 'fa-caret-down': !order })} />
              </th>
              <th className="border-top-0" scope="col" colSpan="3">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>{this.renderTableRows()}</tbody>
        </table>
      </Layout>
    );
  }
}

export default ContactList;
