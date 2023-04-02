import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { removecontacts, getcontacts } from '../context/contactState';
import contactContext from '../context/contactcontext';

export default function ContactCard(props) {
  const context = useContext(contactContext)
  const { deleteContact} = context

  let contact = props.contact
  let mobile = contact.mobileNumbers[0].mobile
  let photo = `https://ui-avatars.com/api/?name=${contact.firstName}&length=1&background=random&size=262`
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        navigate(`/contact/view/${contact.id}`);
      }}
      role="button"
      className="hover:bg-[#f5f5f5] group relative"
    >
      <td className="flex items-center gap-5 px-4">
        <img className="w-9 h-9 rounded-full" src={photo} />
        <span className="py-4">{contact.firstName}</span>
      </td>
      <td className="px-4">{mobile}</td>

      <div className="hidden group-hover:visible invisible absolute top-0 right-4 h-full gap-3 sm:flex items-center">
        <button
          onClick={(e) => {
            // Prevent parent handlers from firing
            e.stopPropagation();
              if (window.confirm("Delete contact?")) {
                deleteContact(contact.id);
              }
            // }
          }}
        >
          <MdDelete className="text-[#00000051] hover:text-black" size={24} />
        </button>
      </div>
    </tr>
  );
};


