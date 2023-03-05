import React, { useContext, useEffect, useState } from "react";
import { MdChildFriendly, MdContactPage, MdFavorite, MdOutlineCalendarToday, MdOutlineEmail, MdOutlineLocationCity, MdOutlinePerson, MdOutlinePhone, MdOutlinePlace, MdPerson } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import contactContext from "../context/contactcontext";

const PhoneView = () => {
  const context = useContext(contactContext)
  const { getcontactbyid, contacts } = context;
  let navigate = useNavigate()
  const qparam = new URLSearchParams(window.location.search)
  const contactId = qparam.get('id');
  useEffect(() => {
    if(localStorage.getItem('token') == undefined)
    {
      navigate('/auth/login')
    }
    getcontactbyid(contactId);
  }, [])
  let contact = contacts[0]
  return (
    <>
      <div className="border p-4 flex flex-col gap-4 max-w-[520px] rounded-xl">
        <h2 className="font-medium d-inline-block"> Contact Details { contact.isfavourite && <span><i class="fas fa-star"></i></span>}</h2>
       
        <div className="flex gap-4 items-center">
          <MdOutlinePerson className="opacity-[0.7]" size={24} />
          <a href={`tel:${contact.firstName}`} className="text-blue-500">
            {contact.firstName} {contact.middleName} {contact.surname}
            <br />
            <span style={{ "textDecoration": "none", "color": "Black" }}>Full Name</span>
          </a>
        </div>

        <div className="flex gap-4 items-center">
          <MdOutlinePhone className="opacity-[0.7]" size={24} />
          <a href={`tel:${contact["mobileNumbers"][0].mobile}`} className="text-blue-500">
            {contact["mobileNumbers"][0].mobile}
            <br />
            {contact["mobileNumbers"].length > 1 && 
             contact["mobileNumbers"][1].mobile}
             {contact["mobileNumbers"].length > 1 && 
             <br/>}
            <span style={{ "textDecoration": "none", "color": "Black" }}>Mobile</span>
          </a>
        </div>

       
       
        {contact.email != "" &&
          <div className="flex gap-4 items-center">
            <MdOutlineEmail className="opacity-[0.7]" size={24} />
            <a href="#" className="text-blue-500">
              {contact?.email}
              <br />
              <span style={{ "textDecoration": "none", "color": "Black" }}>Email</span>

            </a>
          </div>
        }
        {contact.addresses.length > 0 &&
          <div className="flex gap-4 items-center">
            <MdOutlinePlace className="opacity-[0.7]" size={24} />
            <a href="#" className="text-blue-500">
              {contact?.addresses[0].street_Name}, {contact?.addresses[0].city}, {contact?.addresses[0].district}
              <br />
              <span style={{ "textDecoration": "none", "color": "Black" }}>Home</span>

            </a>
          </div>
        }

        {contact.linkedinUrl == null &&
          <div className="flex gap-4 items-center">
            <MdContactPage className="opacity-[0.7]" size={24} />
            <a href={`tel:${contact?.linkedinUrl}`} className="text-blue-500">
              Linkedin

            </a>
          </div>
        }

      </div>
      <div className="border p-4 flex flex-col gap-4 max-w-[520px] rounded-xl my-3">
        <h2 className="font-medium">About {contact.firstName}</h2>
        <div className="flex gap-4 items-center">
          <MdOutlineCalendarToday className="opacity-[0.7]" size={24} />
          <a href={`tel:${0}`} className="text-blue-500">
            {contact?.birthDate}
            <br />
            <span style={{ "textDecoration": "none", "color": "Black" }}>Birthdate</span>
          </a>
        </div>

        {contact.nickName != "" &&
          <div className="flex gap-4 items-center">
            <MdOutlineEmail className="opacity-[0.7]" size={24} />
            <a href={`tel:${contact?.nickName}`} className="text-blue-500">
              {contact?.nickName}
              <br />
              <span style={{ "textDecoration": "none", "color": "Black" }}>Nick Name</span>

            </a>
          </div>
        }

        {contact.gender != "" &&
          <div className="flex gap-4 items-center">
            <MdPerson className="opacity-[0.7]" size={24} />
            <a href="#" className="text-blue-500">
              {contact?.gender}
              <br />
              <span style={{ "textDecoration": "none", "color": "Black" }}>Gender</span>

            </a>
          </div>
        }

        {contact.relationship != "" && contact.relationship != null &&
          <div className="flex gap-4 items-center">
            <MdChildFriendly className="opacity-[0.7]" size={24} />
            <a href={`tel:${contact?.nickName}`} className="text-blue-500">
              {contact?.relationship}
              <br />
              <span style={{ "textDecoration": "none", "color": "Black" }}>RelationShip</span>

            </a>
          </div>
        }
      </div>
    </>
  );
};

export default PhoneView;
