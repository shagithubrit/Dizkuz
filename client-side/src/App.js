import React from "react";
import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import HomePage from "./Pages/HomePage/HomePage";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import OrganisationsPage from "./Pages/OrganisationsPage/OrganisationsPage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import IssuePage from "./Pages/IssuePage/IssuePage";
import ChatPage from "./Pages/ChatPage/ChatPage";


function App() {
  const [ user, setUser] = useState( {
    username : null,
    useremail : "demoemail@dizkuz.com",
    userorgs : 11,
    usermessages : 193
  });
  const [ userCredentials, setUserCredentials] = useState({});
  

  return (
    <Router>
      <div className="App">
        {/* <NavBar /> */}
        <Routes> 
          <Route path='/' element={<HomePage />} />
          <Route path='/organisations' element={<OrganisationsPage />} />
          <Route path='/categories' element={<CategoryPage />} />
          <Route path='/chats' element={<ChatPage />} />
          <Route path='/issues' element={<IssuePage />} />
          <Route path='/landing' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
