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
    {/* <OrganisationsPage  /> */}
    <CategoryPage />
    <Footer />
    </>
  );
}

export default App;
