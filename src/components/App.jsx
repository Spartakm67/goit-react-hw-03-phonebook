import { Component } from 'react';
import { Container, IfEmpty } from "./App.styled"; 
import { ContactsForm } from "./ContactsForm/ContactsForm";
import { ContactsFormList } from './ContactsFormList/ContactsFormList';
import { Filter } from './Filter/Filter';
import Notiflix from 'notiflix';

export class App extends Component {
state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  //======== HW3 Methods Added=============================================
componentDidMount() {
  console.log('App componentDidUpdate');
  
  const defaultContacts = this.state.contacts;
  console.log('Default Contacts', defaultContacts);

  const actualContacts = localStorage.getItem('contacts');
  
  if (actualContacts !== null) {
    const parsedContacts = JSON.parse(actualContacts);
    console.log('Parsed Contacts', parsedContacts);
    this.setState({ contacts: parsedContacts });
    return;
  } 
// if (parsedContacts) {
// this.setState({contacts: parsedContacts});
//  };
// this.setState({ contacts: defaultContacts });
};

componentDidUpdate(prevState) {

  if (this.state.contacts !== prevState.contacts) {
    console.log('Contacts Updated');

    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
};
//========================================================================

  handleInputChange = event => {
    this.setState({ filter: event.target.value });
  };

  addContact = newContact => {
    
    const isNameExists = this.state.contacts.find(contact =>
      contact.name.toLowerCase() === newContact.name.toLowerCase());
    
    if (isNameExists) {
      Notiflix.Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== id
        ),
      };
    });
  };

  showContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <Container>
        
       <h1>Phonebook</h1>
        <ContactsForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleInputChange} />
        {contacts.length > 0 ? (
          <ContactsFormList
            items={this.showContacts()}
            onDelete={this.deleteContact}
          />
        ) : (
          <IfEmpty> Phonebook is empty</IfEmpty>
        )}
        
    </Container>);
  }
}

Notiflix.Notify.init({
  position: 'right-top',
  width: '400px',
  distance: '10px',
  opacity: 1,
  rtl: false,
  timeout: 2000,
});
