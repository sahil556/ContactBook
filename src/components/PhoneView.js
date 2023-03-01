import React, { useContext } from "react";
import { MdOutlineCalendarToday, MdOutlineEmail, MdOutlineLocationCity, MdOutlinePhone, MdOutlinePlace } from "react-icons/md";
import { useParams } from "react-router-dom";
import contactContext from "../context/contactcontext";
// import store from "../../store";

const PhoneView = ({}) => {
  const context = useContext(contactContext)
  const {findContact, contacts} = context;

  console.log(contacts)
  console.log("object")
  const params = useParams();
  // const contact = findContact(params.id);
  // console.log(contact)
  const contact = {name : "Sahil Nandaniya", number : "123456", id: 12, email: "sahil@gmail.com", birthdate : "27 Feb 2023", address :"Motavadaala"}


  return (
    <>
    <div className="border p-4 flex flex-col gap-4 max-w-[520px] rounded-xl">
      <h2 className="font-medium">Contact Details</h2>
      <div className="flex gap-4 items-center">
        <MdOutlinePhone className="opacity-[0.36]" size={24} />
        <a href={`tel:${contact?.number}`} className="text-blue-500">
          {contact?.number}
          <br/>
          <span style={{"textDecoration": "none", "color": "Black"}}>Mobile</span>
        </a>
      </div>
      <div className="flex gap-4 items-center">
        <MdOutlineEmail className="opacity-[0.36]" size={24} />
        <a href={`tel:${contact?.number}`} className="text-blue-500">
          {contact?.email}
          <br/>
          <span style={{"textDecoration": "none", "color": "Black"}}>Email</span>
        
        </a>
      </div>
      <div className="flex gap-4 items-center">
        <MdOutlinePlace className="opacity-[0.36]" size={24} />
        <a href={`tel:${contact?.address}`} className="text-blue-500">
          {contact?.address}
          <br/>
          <span style={{"textDecoration": "none", "color": "Black"}}>Home</span>
        
        </a>
      </div>
    </div>
    <div className="border p-4 flex flex-col gap-4 max-w-[520px] rounded-xl my-3">
      <h2 className="font-medium">About {contact.firstName}</h2>
      <div className="flex gap-4 items-center">
        <MdOutlineCalendarToday className="opacity-[0.36]" size={24} />
        <a href={`tel:${contact?.number}`} className="text-blue-500">
          {contact?.birthdate}
          <br/>
          <span style={{"textDecoration": "none", "color": "Black"}}>Birthdate</span>
        </a>
      </div>
      </div>
    </>
  );
};

export default PhoneView;
