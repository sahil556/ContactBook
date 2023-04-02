import { BrowserRouter,Route, Routes, useNavigate} from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { observer } from 'mobx-react';
import ContactsList from './components/ContactsList';
import ContactEdit from './components/ContactEdit';
import ContactView from './components/ContactView';
import AddContact from './components/AddContact';
import PhoneView from './components/PhoneView';
import Header from './components/Header';
import ContactState from './context/contactState';
import Login from './components/Login';
import AddIcon from './assets/add.png';
import Signup from './components/Signup';
import ViewProfile from './components/ViewProfile';
import { AlertProvider } from './context/AlertContext';
import { Toast } from 'react-hot-toast';
import './App.css';
import { Button } from '@mui/material';
import React, { useState } from 'react';

function App() {
  return (
    <ContactState>
    <AlertProvider>
    <BrowserRouter>
    <Toaster position="top-center"/>
    <Header/>
    <div className='max-w-[1440px] m-auto'>
    <Routes>
          <Route path="/" element={<ContactsList />} />
          <Route path="/auth/login/" element={<Login/>}></Route>
          <Route path="/auth/signup/" element={<Signup/>}></Route>
          <Route path="/user/view/" element={<ViewProfile/>}></Route>
          <Route path="/contact/view/:id" element={<PhoneView/>}></Route>
          <Route path="/contact/edit/:id" element={<ContactEdit />} ></Route> 
          <Route path="/add" element={<AddContact />} />
        
        </Routes>
    </div>
    <FAB/>
    </BrowserRouter>
    </AlertProvider>
    </ContactState>
    
  );
}

export default observer(App);


const FAB = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/add")}
      className="rounded-full md:hidden p-4 bg-white fixed bottom-10 right-5 shadow-xl z-50 hover:shadow-md"
    >
      <img src={AddIcon} className="w-9 h-9 rounded-full" />
    </button>
  );
};