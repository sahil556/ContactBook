import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "../assets/add.png";
import Logo from "../assets/logo.png";
import contactContext from '../context/contactcontext'
import { CSVLink, csv } from "react-csv"
import Papa from "papaparse"
import { toast } from 'react-hot-toast';

export default function Header() {
  const navigate = useNavigate();
  const context = useContext(contactContext)
  const { contacts, addContact } = context
  const headers = [
    { label: 'firstName', key: 'firstName' },
    { label: 'middleName', key: 'middleName' },
    { label: 'surname', key: 'surname' },
    { label: 'nickName', key: 'nickName' },
    { label: 'email', key: 'email' },
    { label: 'Birthdate', key: 'birthDate' },
    { label: 'isFavourite', key: 'isFavourite' },
    { label: 'gender', key: 'gender' },
    { label: 'linkedinUrl', key: 'linkedinUrl' },
    { label: 'relationship', key: 'relationship' },
    { label: 'mobile', key: 'mobileNumbers[0].mobile'},
    { label: 'mobile2', key: 'mobileNumbers[1].mobile'},
    
  ]
  const csvReport = {
    filename: "contacts.csv",
    headers: headers,
    data: contacts
  };
  var commonConfig = { delimiter: "," };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  }
  const viewProfile = () => {
    navigate("/user/view/")
  }

  // importing csv

    const [csvData, setCsvData] = useState([]);

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
       
        const files = e.target.files;
        if (files) {
          
          Papa.parse(files[0], {
            ...commonConfig,
            header:true,
            download:true,
            complete: function(results) {
              document.getElementById('import').innerHTML = "Add to Your Contact";
              
              setCsvData(results.data); 
              toast.success("file imported ! click add to contact")
            }}
          )
        }
       
    };
    const address = {
      house_no: 0,
      street_Name: "",
      city: "",
      district: "",
      postalCode: 0,
      country: "India"
    };
    const user = {
      firstName: "",
      middleName :"",
      surname:"",
      email:"",
      birthDate: new Date("2000-11-01"),
      gender:"male",
      isfavourite: false,
      mobile: 0,
      mobile2: 0,
      nickName:""
    }
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        let i = 1;
        
        for(let persondetail of csvData)
        {
          if(persondetail.firstName === "")
          break;
          if(persondetail.isFavourite === "FALSE")
            persondetail.isFavourite = false;
          else
            persondetail.isFavourite = true;
          if(persondetail.mobile.length > 10 || persondetail.mobile.length < 10 )
          {
            continue;
          }
          let status = addContact(persondetail, address)
          status.then(()=>{
            toast.success(`Contact ${i}: Saved Successfully`);
          }, ()=>{
            toast.error("Something Went Wrong !");
          })
          sleep(3000);
          i++;
        }
        navigate('/')

    };



  let token = localStorage.getItem('token')
  return (
    <div>
      <header className="sticky top-0 bg-white z-10 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center pr-4 justify-between max-w-[1440px] m-auto">
          <Link to={"/"} className="flex px-8 py-3 items-center gap-3">
            <img src={Logo} className="w-10 h-10" />
            <span className="text-[#5f6368] text-xl">ContactBook</span>
          </Link>


          {token != undefined &&

            <button
              onClick={() => navigate("/add")}
              className="px-2 sm:pr-4 py-1 border rounded-full items-center hidden md:flex gap-2 shadow hover:shadow-md"
            >
              <img src={AddIcon} className="w-9 h-9 rounded-full" />
              <span className="font-medium text-sm lg:text-base hidden sm:block">
                Create contact
              </span>
            </button>
          }
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center pr-4 max-w-[1440px] m-auto">
          {token != undefined &&
            <button
              onClick={handleLogout}
              className="px-2 sm:pr-4 py-1 border rounded-full items-center hidden md:flex gap-2 shadow hover:shadow-md"
            >

              <span className="font-medium text-sm lg:text-base hidden sm:block">
                Logout
              </span>
            </button>
          }

          {token != undefined &&

            <button
              onClick={viewProfile}
              className="px-2 mx-2 sm:pr-4 py-1 border rounded-full items-center hidden md:flex gap-2 shadow hover:shadow-md"
            >

              <span className="font-medium text-sm lg:text-base hidden sm:block">
                View Profile
              </span>
            </button>


          }
          {token != undefined && contacts.length > 0 &&
            <button
              className="px-2 mx-2 sm:pr-4 py-1 border rounded-full items-center hidden md:flex gap-2 shadow hover:shadow-md"
              
            >

              <span className="font-medium text-sm lg:text-base hidden sm:block">
                <CSVLink {...csvReport} >Export Contact</CSVLink>
              </span>
            </button>
          }
          {token != undefined &&
            <div
              className="px-2 mx-2 sm:pr-4 py-1 border rounded-full items-center hidden md:flex gap-2 shadow hover:shadow-md"
            >
              
              <input style={{"width":"15.2vw"}} type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange} />
               <button className='items-center hidden md:flex' onClick={(e) => {
                        handleOnSubmit(e);
                    }} id='import'> Import CSV </button>
            </div>
          }

        </div>
      </header>
    </div>
  )
}
