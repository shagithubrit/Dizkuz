import React, { useEffect } from 'react';
import OrganisationCard from '../../Components/OrganisationCard';
import testImg from './testimg.jpeg';
import './OrganisationPage.css';

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
  

  const CardsComponent = cards.map((card) =>{
    return(
    <div>
        <OrganisationCard logo={card.logo} title={card.title} id={card.id} key={card.id}/>
    </div>
    );
  });

  console.log( CardsComponent);
  return (
    <div  style={{paddingTop : '100px'}}>
    
    <div className='OrganisationPageContainer1'>
        <h3 style={{textAlign: 'center'}}>Your Organisations</h3>
        <hr/>
        <div className='OrganisationPageContainer2'>
            {CardsComponent}
        </div>
    </div>
    </div>
  );
}
