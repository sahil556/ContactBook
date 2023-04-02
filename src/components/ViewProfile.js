import React, { useEffect, useState } from 'react'
import '../assets/profile.css'
import { toast } from "react-hot-toast";


export default function ViewProfile() {
  const [credentials, setCredentials] = useState({ user_Name: "", email: "", mobile: "", birthdate: "2000-10-10" })
  const getuserbyid = async () => {
    let token = localStorage.getItem("token")
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer " + token
    }

    let response = await fetch("https://localhost:7228/api/Users/onlyprofile", {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    delete data.contactItems
    data.birthdate = data.birthdate.substr(0, 10);
    setCredentials(data)

  }
  useEffect(() => {
    getuserbyid();
  },[])

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const updateprofile = async() => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       "userId": credentials.userId,
       "user_Name": credentials.user_Name,
       "mobile": credentials.mobile,
       "email": credentials.email,
       "birthdate":credentials.birthdate
     });
     
     let response = await fetch("https://localhost:7228/api/Users", { 
       method: "PUT",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.text();
     if(response.status == 204)
      {
        toast.success("Profile Updated Successfully");
      }
     else
      toast.error("Something went Wrong !");
     
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
   const {user_Name, email, birthdate, mobile} = credentials;
   var regex = /[a-zA-Z]/g;
   if(mobile.length != 10 && !regex.test(mobile))
   {
    toast.error("please Enter valid mobile number")
   }
   else if(user_Name.length < 3)
   {
    toast.error("Please Enter valid name")
   }
   else
   {
      updateprofile();
   }
    
  }

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5" style={{"fontSize": "18px"}}>
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5"
              src={`https://ui-avatars.com/api/?name=${credentials.user_Name}&length=1&background=random&size=195`} /><span
                className="font-weight-bold" >{credentials.user_Name}</span><span className="text-black-50">{credentials.email}</span><span> </span>
            </div>
          </div>
          <div className="col-md-4 border-right" >
            
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 style={{ "fontSize": "25px"}} className="text-right b">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6"><label className="labels" >Name</label><input type="text" name="user_Name" className="form-control"
                  placeholder="first name" onChange={onChange} value={credentials.user_Name}  required/></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12"><label className="labels">PhoneNumber</label><input type="number" minLength="10" maxLength="10 " name="mobile" className="form-control"
                  placeholder="enter phone number" onChange={onChange} value={credentials.mobile} required={true}/></div>

                <div className="col-md-12"><label className="labels">Email ID</label><input type="text" name="email" className="form-control"
                  placeholder="enter email id" disabled onChange={onChange} value={credentials.email} required/></div>

              </div>
              <div className="mt-5 text-center"><button className="btn btn-primary profile-button" onClick={handleSubmit} type="button">Update Profile </button></div>
            </div>
           
          </div>
          <div className="col-md-4">
        <div className="p-3 py-5">
          <div className="col-md-12"><label className="labels">Experience in Designing</label><input
              className="form-control" name="birthdate" onChange={onChange} placeholder="experience" value={credentials.birthdate} type="date"/></div>
        </div>
      </div>
        </div>
      </div>
    </>
  )
}
