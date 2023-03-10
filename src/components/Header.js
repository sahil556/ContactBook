import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "../assets/add.png";
import Logo from "../assets/logo.png";

export default function Header() {
    const navigate = useNavigate();
    const handleLogout = () =>{
      localStorage.removeItem('token');
      navigate('/auth/login');
  }
    const viewProfile = () => {
       navigate("/user/view/")
    }
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
          onClick={viewProfile}
          className="px-2 mx-2 sm:pr-4 py-1 border rounded-full items-center hidden md:flex gap-2 shadow hover:shadow-md"
        >
          
          <span className="font-medium text-sm lg:text-base hidden sm:block">
            View Profile
          </span>
        </button>
        }
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
        
        </div>
    </header>
    </div>
  )
}
