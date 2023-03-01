import { BrowserRouter,Route, Routes, useNavigate} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { observer } from 'mobx-react';
import ContactsList from './components/ContactsList';
import ContactEdit from './components/ContactEdit';
import ContactView from './components/ContactView';
import AddContact from './components/AddContact';
import PhoneView from './components/PhoneView';
import Header from './components/Header';
import ContactState from './context/contactState';

import AddIcon from './assets/add.png';
import './App.css';

function App() {
  return (
    <ContactState>
    <BrowserRouter>
    <Toaster position="top-center"/>
    <Header/>
    <div className='max-w-[1440px] m-auto'>
    <Routes>
          <Route path="/" element={<ContactsList />} />
          <Route path="/contact/" element={<ContactView />}>
            <Route path="/contact/" element={<PhoneView />} />
            <Route path="/contact/:id/edit" element={<ContactEdit />} />
          </Route>
          <Route path="/add" element={<AddContact />} />
        </Routes>
    </div>
    <FAB/>
    </BrowserRouter>
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