import { observer } from "mobx-react";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import contactContext from "../context/contactcontext";
import { MdAddRoad, MdHouse, MdLocationCity, MdLocationOn, MdOutlineArrowDropDown, MdOutlineCheckBox, MdOutlineDateRange, MdOutlineEmail, MdOutlineMale, MdOutlineMobileFriendly, MdOutlinePhone, MdOutlineSelectAll, MdPersonAddAlt, MdPersonOutline, MdPlace, MdStreetview } from "react-icons/md";
import { AlertContext } from "../context/AlertContext";
import { toast } from "react-hot-toast";
import { display } from "@mui/system";

const ContactEdit = (props) => {
  const params = useParams();
  const {alert, showAlert} = useContext(AlertContext)
  const context = useContext(contactContext)
  const { getcontactbyid, contacts, updatecontact } = context;
  let navigate = useNavigate()
  const contactId = params.id

  const [persondetail, setPersonDetail] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    birthDate: new Date("2000-11-01"),
    gender: "",
    isfavourite: false,
    mobile: 0,
    mobile2: 0,
    nickName: ""
  })

  const [address, setAddress] = useState({
    house_no: 0,
    street_Name: "",
    city: "",
    district: "",
    postalCode: 0,
    country: "India"
  })

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => {
      return { ...prev, [name]: value }
    })
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonDetail((prev) => {
      if (name == "isfavourite") {
        return { ...prev, [name]: !e.target.checked }
      }
      return { ...prev, [name]: value }
    })
  }
  let loaded = false
  if(persondetail.mobile != "")
    loaded = true



  useEffect(() => {
    if(localStorage.getItem('token') == undefined)
    {
      navigate('/auth/login')
    }
    getcontactbyid(contactId);
    let contact = contacts[0]
    let add = contact.addresses[0]
    contact.birthDate  = contact.birthDate.substr(0,10)
    if(add != undefined)
    setAddress(add)
    // delete contact["addresses"]
    contact.mobile = contact["mobileNumbers"][0].mobile
    if(contact["mobileNumbers"].length > 1)
      contact.mobile2 = contact["mobileNumbers"][1].mobile
    else
      contact.mobile2 = 0
    // delete contact["mobileNumbers"]
    setPersonDetail(contact)
  }, [])

  const handleSubmit = () => {
    if (window.confirm("Are You Sure You want to Update contact ?")) {
    let status = updatecontact(persondetail, address)
    console.log(status)
    status.then(()=>{
      toast.success("Contact Updated Successfully");
      navigate(`/contact/?id=${contactId}&name=${persondetail.firstName}`)
    }, ()=>{
      toast.error("Contact Updation Failed");
    })
    }
    // notification 
  };

  return (
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
            value={persondetail.firstName}
            onChange={handleChange}
            className="border-b w-full focus:outline-none leading-8"
            placeholder="Name"
          />
        </div>
        <div className="flex gap-4 my-8 w-full items-center">
          <MdPersonOutline size={28} style={{ "visibility": "hidden" }} className="opacity-[0.56]" />
          <input
            name="middleName"
            value={persondetail.middleName}
            onChange={handleChange}
            className="border-b w-full focus:outline-none leading-8"
            placeholder="Middle Name"
          />
        </div>
        <div className="flex gap-4 my-8 w-full items-center">
          <MdPersonOutline size={28} style={{ "visibility": "hidden" }} className="opacity-[0.56]" />
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

        {loaded && <div className="flex gap-4 my-8 w-full items-center">
          <MdOutlineMobileFriendly size={28} className="opacity-[0.56]" />
          <input
            name="mobile"
            value={persondetail.mobile == undefined ? "" : persondetail.mobile}
            onChange={handleChange}
            type="number"
            minLength={10}
            maxLength={10}
            className="border-b w-full focus:outline-none leading-8"
            placeholder="Mobile number"
          />
         
        </div> }
        
        {loaded &&
        <div className="flex gap-4 my-8 w-full items-center">
          <MdOutlinePhone size={28} className="opacity-[0.56]" />
          <input
            name="mobile2"
            value={persondetail.mobile2 == "" ? "" : persondetail.mobile2}
            onChange={handleChange}
            type="number"
            minLength={10}
            maxLength={10}
            className="border-b w-full focus:outline-none leading-8"
            placeholder="Mobile number"
          />
        </div>
        }

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
            onChange={() => { }}
            checked={!persondetail.isfavourite}
            className="w-5"
          />
        </div>

        <div className="flex gap-4 my-8 w-full items-center">
          <p style={{ "fontSize": "22px" }}> Address Details</p>
        </div>

        <div className="flex gap-4 my-8 w-full items-center">
          <MdHouse size={28} className="opacity-[0.56]" />
          <input
            name="house_no"
            value={address == 0 ? "" : address.house_no}
            onChange={handleAddressChange}
            className="border-b w-full focus:outline-none leading-8"
            placeholder="House No"
          />
        </div>
        <div className="flex gap-4 my-8 w-full items-center">
          <MdAddRoad size={28} className="opacity-[0.56]" />
          <input
            name="street_Name"
            value={address.street_Name}
            onChange={handleAddressChange}
            className="border-b w-full focus:outline-none leading-8"
            placeholder="Street Name"
          />
        </div>
        <div className="flex gap-4 my-8 w-full items-center">
          <MdLocationCity size={28} className="opacity-[0.56]" />
          <input
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            className="border-b w-full focus:outline-none leading-8"
            placeholder="City"
          />
        </div>
        <div className="flex gap-4 my-8 w-full items-center">
          <MdPlace size={28} className="opacity-[0.56]" />
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default observer(ContactEdit);
