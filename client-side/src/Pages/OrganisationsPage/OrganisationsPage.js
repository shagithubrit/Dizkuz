import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import OrganisationCard from '../../Components/OrganisationCard';
import testImg from './testimg.jpeg';
import './OrganisationPage.css';
import Footer from '../../Components/Footer';
import NavBar from '../../Components/NavBar';

const cards = [
    {
        logo : testImg,
        title : 'Title1',
        id : 'id1'
    },
    {
        logo : testImg,
        title : 'Title2',
        id : 'id2'
    },
    {
        logo : testImg,
        title : 'Title3',
        id : 'id3'
    },
    {
        logo : testImg,
        title : 'Title4',
        id : 'id4'
    },
    {
        logo : testImg,
        title : 'Title5',
        id : 'id5'
    }
];

export default function OrganisationsPage() {
  const navigate = useNavigate();

  const CardsComponent = cards.map((card) =>{
    return(
    <div>
        <OrganisationCard logo={card.logo} title={card.title} id={card.id} key={card.id}/>
    </div>
    );
  });

  const [ currentUser, setCurrentUser] = useState({
    name : null,
    email : null,
    password : null,
    organisations : [],
    messages : 0
  });

  useEffect( () => {
    const currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser( currentUser_);

    if( currentUser.name == null){
      navigate( '/landing');
    }

  }, []);


  console.log( CardsComponent);
  return (
    <>
    <NavBar />
    <div  style={{paddingTop : '100px'}}>
    
      <div className='OrganisationPageContainer1'>
          <h3 style={{textAlign: 'center'}}>Your Organisations</h3>
          <hr/>
          <div className='OrganisationPageContainer2'>
              {CardsComponent}
          </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
