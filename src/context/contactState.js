import React, { useState } from "react";
import contactContext from "./contactcontext";

const ContactState = (props) => {
  const host = "https://localhost:7228"
  const contactsInitial = []
  const [contacts, setContacts] = useState(contactsInitial)

  // Get all Contacts
  const getContacts = async () => {
    // API Call 
    const response = await fetch(`${host}/api/ContactItems/`, {
      method: 'GET',
      headers: {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
    // console.log(localStorage.getItem('token'))
    const json = await response.json()
    setContacts(json)
  }

  // get contact by id
  const getcontactbyid = async (id) => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer " + localStorage.getItem('token')
     }
     
     let response = await fetch("https://localhost:7228/api/ContactItems/" + id, { 
       method: "GET",
       headers: headersList
     });
     
     let json = await response.json();
     setContacts(json);
  }

  // add  mobile

  const addmobile = async(mobile) => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer " + localStorage.getItem('token'),
     "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify(mobile);
     
     let response = await fetch("https://localhost:7228/api/MobileNumbers", { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.text();
    //  console.log(data);
     
  }

  // update mobile
  const updatemobile = async(mobile) => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer " + localStorage.getItem('token'),
       "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify( mobile);
     
     let response = await fetch("https://localhost:7228/api/MobileNumbers/" + mobile.id, { 
       method: "PUT",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.text();
    //  console.log(data);
     // empty content body
     
  }

  // add address

  const addaddress = async (address) => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer "+ localStorage.getItem('token'),
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify(address);
     
     let response = await fetch("https://localhost:7228/api/Addresses", { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.text();
    //  console.log(data);
     
  }

  // update address
  const updateaddress = async(address) => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer " + localStorage.getItem('token'),
       "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify( address);
     
     let response = await fetch("https://localhost:7228/api/Addresses/" + address.id, { 
       method: "PUT",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.text();
    //  console.log(data);
     
  }

  // update contact

  const updatecontact = async (contact, address) =>{

    let contactid = contact.id
    // update address call
    // console.log(address)
    address.contactItemId = contact.id
    if(contact.addresses.length == 0)
    {
      // add address
      addaddress(address)
    }
    else
    {
      updateaddress(address)
    }
    let mobiles = contact["mobileNumbers"]
    mobiles[0].mobile = contact.mobile
    updatemobile(mobiles[0])

    if(contact.mobile2 != 0)
    {
      if(mobiles.length > 1)
      {
        mobiles[1].mobile = contact.mobile2
        let responce = updatemobile(mobiles[1], contactid)
      }
      else
      {
        let mobile2 = {
          "id": 0,
          "mobile": contact.mobile2,
          "countryCode": 0,
          "contactItemId": contactid
        }
        addmobile(mobile2)
        // create new contact 
      }
      
    }

    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer "+ localStorage.getItem('token'),
       "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify(contact);
     
     let response = await fetch("https://localhost:7228/api/ContactItems/" + contactid, { 
       method: "PUT",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.text();
     return response.status;
    //  console.log(data);

     
     

  }

  // add new contact 
  // *******************8
  const addContact = async (user, address) => {
    if(address.city != "")
    {
      user.addresses = []
      user.addresses.push(address)
    }

    if(user.mobile != 0 || user.mobile2 != 0)
    {
      user["mobileNumbers"] = []
      if(user["mobile"] != 0)
      user["mobileNumbers"].push({"mobile" : user["mobile"]})
      if(user["mobile2"] != 0)
      user["mobileNumbers"].push({"mobile" : user["mobile2"]})
    }

    delete user["mobile"]
    delete user["mobile2"]

    // API Call 
    const response = await fetch(`${host}/api/ContactItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": localStorage.getItem('token')
        "Authorization": "Bearer " + localStorage.getItem('token')

      },
      body: JSON.stringify(user)
    });

    const contact = await response.json()
    setContacts(contacts.concat(contact))
    return response.status;
  }

  // delete contact from contact list
  const deleteContact = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/ContactItems/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": localStorage.getItem('token')
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
    const json = response.json();
    
    const newContacts = contacts.filter((contact) => { return contact.id !== id })
    setContacts(newContacts)
    return response.status;
  }
  
  

  return (
    <contactContext.Provider value={{ contacts, getContacts, deleteContact, getcontactbyid, addContact, updatecontact, setContacts }}>
      {props.children}
    </contactContext.Provider>
  )


}
export default ContactState