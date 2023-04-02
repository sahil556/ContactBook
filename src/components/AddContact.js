import { useContext, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdAddRoad, MdHouse, MdLocationCity, MdLocationOn, MdOutlineArrowDropDown, MdOutlineCheckBox, MdOutlineDateRange, MdOutlineEmail, MdOutlineMale, MdOutlineMobileFriendly, MdOutlinePhone, MdOutlineSelectAll, MdPersonAddAlt, MdPersonOutline, MdPlace, MdStreetview } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import contactContext from "../context/contactcontext";
import { AlertContext } from "../context/AlertContext";
import { toast } from "react-hot-toast";

const AddContact = (props) => {
  const navigate = useNavigate();
  const context = useContext(contactContext)
  const {alert, showAlert} = useContext(AlertContext)
  const {addContact} = context;
  
  const [persondetail, setPersonDetail] = useState({
    firstName: "",
    middleName :"",
    surname:"",
    email:"",
    birthDate: new Date("2000-11-01"),
    gender:"",
    isfavourite: false,
    mobile: 0,
    mobile2: 0,
    nickName:""
  })

  const [address, setAddress] = useState({
    house_no: 0,
    street_Name: "",
    city: "",
    district: "",
    postalCode: 0,
    country: "India"
  })

  const handleAddressChange = (e) =>{
    const {name, value} = e.target;
    setAddress((prev) => {
      return {...prev, [name]:value}
    })
  }

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setPersonDetail((prev) => {
      if(name == "isfavourite")
      {
      return {...prev, [name]:!e.target.checked}
      }
      return {...prev, [name]:value}
    })
  }

  const handleSubmit = () => {
    // console.log(persondetail)
    // console.log(address)
    var regex = /[a-zA-Z]/g;
    if(regex.test(persondetail.mobile) || persondetail.mobile.length > 10 || persondetail.mobile.length < 10 )
    {
      toast.danger("please enter a valid mobile number")
      return
    }
    let status = addContact(persondetail, address)
    status.then(()=>{
      toast.success("Contact Saved Successfully");
      navigate("/");
    }, ()=>{
      toast.error("Something Went Wrong !");
    })
  };
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
            <MdPersonAddAlt size={28} className="opacity-[0.56]" />
            <input
              name="nickName"
              value={persondetail.nickName}
              onChange={handleChange}
              type="text"
              className="border-b w-full focus:outline-none leading-8"
              placeholder="Nick Name"
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
            <MdOutlineMobileFriendly size={28} className="opacity-[0.56]" />
            <input
              name="mobile"
              value={persondetail.mobile == 0 ? "" : persondetail.mobile}
              onChange={handleChange}
              type="number"
              minLength={10}
              maxLength={10}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="Mobile number"
            />
          </div>

          <div className="flex gap-4 my-8 w-full items-center">
            <MdOutlinePhone size={28} className="opacity-[0.56]" />
            <input
              name="mobile2"
              value={persondetail.mobile2 == 0 ? "" : persondetail.mobile2}
              onChange={handleChange}
              type="number"
              minLength={10}
              maxLength={10}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="Phone number"
            />
          </div>

          <div className="flex gap-4 my-8 w-full items-center">
            <MdOutlineSelectAll size={28} className="opacity-[0.56]" />
            <select className="border-b w-full focus:outline-none leading-8" name="gender" onChange={handleChange} value={persondetail.gender}>
              <option value={"male"}>male</option>
              <option value={"female"}>female</option>
              <option value={"other"}>other</option>
            </select>
          </div>

          <div className="flex gap-4 my-8 w-full items-center">
            <MdOutlineDateRange size={28} className="opacity-[0.56]" />
            <input
              value={persondetail.birthDate}
              name="birthDate"
              type="date"
              onChange={handleChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="BirthDate"
            />
          </div>

          <div className="flex gap-4 my-8 w-full items-center">
            <MdOutlineCheckBox size={28} className="opacity-[0.56]" />
            <label>Favourite</label>
            <input
              name="isfavourite"
              type="checkbox"
              onClick={handleChange}
              onChange={()=>{}}
              checked={!persondetail.isfavourite}
              className="w-5"
            />
          </div>

          <div className="flex gap-4 my-8 w-full items-center">
          <p style={{"fontSize":"22px"}}> Address Details</p>
          </div>

          <div className="flex gap-4 my-8 w-full items-center">
            <MdHouse size={28} className="opacity-[0.56]" />
            <input
              name="house_no"
              value={address.house_no == 0 ? "" : address.house_no}
              onChange={handleAddressChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="House No"
            />
          </div>
          <div className="flex gap-4 my-8 w-full items-center">
          <MdAddRoad size={28}  className="opacity-[0.56]" />
            <input
              name="street_Name"
              value={address.street_Name}
              onChange={handleAddressChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="Street Name"
            />
          </div>
          <div className="flex gap-4 my-8 w-full items-center">
          <MdLocationCity size={28}  className="opacity-[0.56]" />
            <input
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="City"
            />
          </div>
          <div className="flex gap-4 my-8 w-full items-center">
          <MdPlace size={28}  className="opacity-[0.56]" />
            <input
              name="district"
              value={address.district}
              onChange={handleAddressChange}
              className="border-b w-full focus:outline-none leading-8"
              placeholder="District"
            />
          </div>

          <div className="">
            <button
              type="submit"
              disabled={persondetail.firstName === "" || persondetail.mobile === ""}
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
