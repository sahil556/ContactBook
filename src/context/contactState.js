import { faker } from "@faker-js/faker";
import { action, autorun, computed, makeObservable, observable, set, toJS, } from "mobx";
import toast from "react-hot-toast";
import React, { useState } from "react";
import contactContext from "./contactcontext";

const generatePlaceholderData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    let name = faker.name.findName();
    data.push({
      name,
      number: faker.phone.phoneNumber("02# ### ####"),
      photo: `https://ui-avatars.com/api/?name=${name}&length=1&background=random&size=262`,
      id: `${i}`,
    });
  }
  return data;
};


const saveStore = (_this) => {
  const storedJson = localStorage.getItem("phonebookStore");
  if (storedJson) {
    set(_this, JSON.parse(storedJson));
  }
  autorun(() => {
    const value = toJS(_this);
    localStorage.setItem("phonebookStore", JSON.stringify(value));
  });
};

const ContactState = (props) => {
  const host = "https://localhost:7228"
  const contactsInitial = []
  const [contacts, setContacts] = useState(contactsInitial)
  let authToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJzYWhpbCBuYW5kYW5peWEiLCJuYmYiOjE2Nzc1NjcwMjYsImV4cCI6MTY3NzY1MzQyNSwiaWF0IjoxNjc3NTY3MDI2fQ.TL5xK69iJaBpr5Z5QNUBGSUL2Ch4WN6S9HgGryy4RQU8EAKdOGGDIOqz3OMJdFYhUGfGpBCILLTYIngfq3LbLA"

  // Get all Contacts
  const getContacts = async () => {
    // API Call 
    const response = await fetch(`${host}/api/ContactItems/`, {
      method: 'GET',
      headers: {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Bearer " + authToken
      }
    });
    const json = await response.json()
    setContacts(json)
  }

  // search contact
  const findContact = (id) => {
    getContacts();
    return contacts.find((e) => e.id === id);
  };

  // add new contact 
  // *******************8
  const addContact = async (userId, firstName, middleName = '' , surname = '', email, birthDate = '',gender, linkedinUrl = 'www.linkedin.com', nickName ) => {
    // API Call 
    const response = await fetch(`${host}/api/ContactItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": localStorage.getItem('token')
        "Authorization": "Bearer " + authToken

      },
      body: JSON.stringify({userId, firstName, middleName, surname, email, birthDate, gender, linkedinUrl})
    });

    const contact = await response.json()
    setContacts(contacts.concat(contact))
  }

  // delete contact from contact list
  const deleteContact = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/ContactItems/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": localStorage.getItem('token')
        "Authorization": "Bearer " + authToken
      }
    });
    const json = response.json();
    const newContacts = contacts.filter((contact) => { return contact.id !== id })
    setContacts(newContacts)
  }

  return (
    <contactContext.Provider value={{ contacts, getContacts, deleteContact, findContact }}>
      {props.children}
    </contactContext.Provider>
  )


}
export default ContactState