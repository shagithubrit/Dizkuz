import React from 'react';
import './Components.css';

export default function OrganisationCard(prop) {
  const openOrganisation = () => {
    console.log( "organisation : ", prop.id);
  };

  return (
    <div className='OrganisationCardOuter' onClick={openOrganisation}>
        <img className='OrganisationLogo' src={prop.logo} alt='logo' />
        <div className='OrganisationTitle'> <h5>{prop.title}</h5> </div>
    </div>
  )
}
