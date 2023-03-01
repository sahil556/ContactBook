import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import ContactCard from './ContactCard'
import contactContext from '../context/contactcontext'

const ContactsList = (props) => {
  const context = useContext(contactContext)
  const { contacts, getContacts } = context

  useEffect(() => {    
    getContacts();
  }, [])
  
return (
  <div className="relative px-4  ">
    <table className="w-full border-separate">
      <thead className="sticky top-16 z-10 bg-white border-b">
        <tr>
          <th className="w-1/2 text-left font-normal py-3 border-b px-4">
            Name
          </th>
          <th className="w-1/2 text-left font-normal py-3 border-b px-4">
            Phone Number
          </th>
        </tr>
      </thead>
      <div className="my-2 mt-4">
        <p className="uppercase text-xs font-medium opacity-[0.56] px-4">
          Contacts
        </p>
      </div>
      <tbody>
        {contacts.map((contact) => (
          
          <ContactCard
            key={contact.id}
            contact = {contact}
            // removeContact = {removeContact}
          />
        ))}
      </tbody>
    </table>
  </div>
)
}
export default observer(ContactsList)