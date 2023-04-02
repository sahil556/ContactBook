import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import contactContext from "../context/contactcontext";
import { AlertContext } from "../context/AlertContext";
import { toast } from "react-hot-toast";

const ContactView = (props) => {
  const context = useContext(contactContext)
  const { deleteContact} = context
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();
  const contactId = props.id
  const deleteconfirm = () =>{
    setDisplay(true);
  }
  if(localStorage.getItem('token') == undefined)
    {
      navigate('/auth/login')
    }
  const contactName = props.name
  let photo = `https://ui-avatars.com/api/?name=${contactName.split(" ")[0]}&length=1&background=random&size=262`
  const match = props.mode === "view" ? true : false;

  return (
    <div className="p-8">
      <div className="flex justify-between flex-col sm:flex-row">
        <div className="flex gap-8 flex-col sm:flex-row">
          <div className="flex gap-8">
            <div className="pt-2">
              <button onClick={() => navigate(-1)}>
                <IoMdArrowBack size={28} />
              </button>
            </div>
            <img className="rounded-full w-44 h-44" src={photo} />
          </div>
          <div className="flex items-center justify-center ml-2 my-4">
            <h1 className="text-3xl">{contactName}</h1>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          {match && (
            <div className="flex justify-end items-end">
              <button
                onClick={() => navigate(`/contact/edit/${contactId}`)}
                className="h-10 bg-[#1a73e8] text-white px-8 rounded"
              >
                Edit
              </button>
            </div>
          )}
          <div className="flex justify-end items-end">
            <button
              onClick={
                
                () => {
                if (window.confirm("Are You Sure You want to Delete contact?")) {
                  deleteContact(contactId).then(()=>{
                    toast.success("Contact Deleted Successfully");
                    navigate("/");
                  }, ()=>{
                    toast.error("Contact Deletion Failed");
                  })
                  
                }
              }
            }
              className="h-10 bg-[#d44235] text-white px-8 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <hr className="my-8" />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default observer(ContactView);
