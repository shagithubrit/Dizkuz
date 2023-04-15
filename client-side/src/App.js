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
  const [ user, setUser] = useState( false);
  const [ userCredentials, setUserCredentials] = useState({});
  

  return (
    // user ?
    // <Router>
    //   <div className="App">
    //     <NavBar />
    //     <Routes> 
    //       <Route path='/' element={<HomePage />} />
    //       <Route path='/organisations' element={<OrganisationsPage />} />
    //       <Route path='/categories' element={<CategoryPage />} />
    //       <Route path='/chats' element={<ChatPage />} />
    //       <Route path='/issues' element={<IssuePage />} />
    //     </Routes>
    //     <Footer />
    //   </div>
    // </Router>
    // :
    // <Router>
    //   <div className="App">
    //     <Routes> 
    //       <Route path='/' element={<LandingPage />} />
    //       <Route path='/login' element={<LoginPage user={user} setUser={setUser}/>} />
    //       <Route path='/signup' element={<SignupPage user={user} setUser={setUser}/>} />
    //     </Routes>
    //   </div>
    // </Router>

    <>
    <NavBar />
    < HomePage name="Aditya" email='aditya@abc.com' numOrg={11} messages={193}/>
    <Footer />
    </>
  );
}

export default App;
