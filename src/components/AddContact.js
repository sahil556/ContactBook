import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineEmail, MdOutlinePhone, MdPersonOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import store from "../store";



const AddContact = (props) => {
  const navigate = useNavigate();
  const [persondetail, setPersonDetail] = useState({
    firstName: "",
    middleName :"",
    surname:"",
    email:"",
    birthDate:"",
    gender:"",
    isfavourite:"",
    mobile: {},
    address: {},
  })

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setPersonDetail((prev) => {
      return {...prev, [name]:value}
    })
  }

  
  let number = "123"
  const handleSubmit = () => {
    console.log(persondetail)
    // store.addContact({ name, number });
    navigate("/");
  };
  // setName("sahil")
  return (
    <div className="p-8">
      <h1 className="mb-6 text-lg font-medium">Create Contact</h1>
      <div className="flex justify-between flex-col sm:flex-row">
        <div className="flex gap-8 flex-col sm:flex-row">
          <div className="flex gap-8">
            <div className="pt-2">
              <button onClick={() => navigate(-1)}>
                <IoMdArrowBack size={28} />
              </button>
            </div>
            <img
              className="rounded-full w-44 h-44"
              src={
                persondetail.firstName
                  ? `https://ui-avatars.com/api/?name=${persondetail.firstName[0]}&length=1&background=random&size=262`
                  : "https://ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
              }
            />
          </div>
        </div>
      </div>
      <hr className="my-8" />
      <div>
        <form
          className="max-w-[520px]"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
          }}
        >
          <div className="flex gap-4 my-8 w-full items-center">
            <MdPersonOutline size={28} className="opacity-[0.56]" />
            <input
              name="firstName"
              value={persondetail.name}
              onChange={handleChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="Name"
            />
          </div>
          <div className="flex gap-4 my-8 w-full items-center">
          <MdPersonOutline size={28} style={{"visibility": "hidden"}}  className="opacity-[0.56]" />
            <input
              name="middleName"
              value={persondetail.middlename}
              onChange={handleChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="Middle Name"
            />
          </div>
          <div className="flex gap-4 my-8 w-full items-center">
          <MdPersonOutline size={28} style={{"visibility": "hidden"}} className="opacity-[0.56]" />
            <input
              name="surname"
              value={persondetail.surname}
              onChange={handleChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="surname"
            />
          </div>

          <div className="flex gap-4 my-8 w-full items-center">
            <MdOutlinePhone size={28} className="opacity-[0.56]" />
            <input
              value={number}
              onChange={handleChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="Phone number"
            />
          </div>

          <div className="flex gap-4 my-8 w-full items-center">
            <MdOutlineEmail size={28} className="opacity-[0.56]" />
            <input
              value={persondetail.email}
              name="email"
              type="email"
              onChange={handleChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="Email"
            />
          </div>


          <div className="flex gap-4 my-8 w-full items-center">
            <MdOutlinePhone size={28} className="opacity-[0.56]" />
            <input
              value={number}
              onChange={handleChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="Phone number"
            />
          </div>

          <div className="">
            <button
              type="submit"
              disabled={persondetail.firstName === "" || number === ""}
              className="h-10 bg-[#1a73e8] text-white px-8 rounded disabled:grayscale"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
