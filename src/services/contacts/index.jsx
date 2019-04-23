import api from '../../services/api';

class Contacts {
  findContacts() {
    return api.get('/contacts');
  }

  createContact(data) {
    return api.post('/contacts', data);
  }

  editContact(id, data) {
    return api.put(`/contacts/${id}`, data);
  }

  deleteContact(id) {
    return api.delete(`/contacts/${id}`);
  }
}

export default new Contacts();
