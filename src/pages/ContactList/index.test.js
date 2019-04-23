import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import contactsService from '../../services/contacts';
import ContactList from './index';

jest.mock('../../services/contacts');

let wrapper;
let contacts;

describe('<ContactList />', () => {
  beforeEach(() => {
    contacts = [{ id: 'id', name: 'test', phone: '123' }];
    contactsService.findContacts.mockResolvedValue(contacts);
    contactsService.deleteContact.mockResolvedValue(contacts);

    wrapper = shallow(<ContactList />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load contacts', async () => {
    await wrapper.instance().loadContacts();

    expect(wrapper.state('contacts')).toEqual(contacts);
  });

  it('should delete contact', async () => {
    await wrapper.instance().loadContacts();
    wrapper.find('.btn.text-danger').simulate('click', { currentTarget: { dataset: { id: 'test' } } });

    expect(contactsService.deleteContact).toHaveBeenCalledWith('test');
  });
});
