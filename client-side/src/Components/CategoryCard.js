import React from 'react';
import './Components.css';

export default function CategoryCard(prop) {

  const openCategory = () => {
    console.log( "Category ID : ", prop.id);
  }

  return (
    <div className='CategoryCardOuter' onClick={openCategory}>
        <div className='CategoryCardTitle'>
            <b>{prop.title}</b>
        </div>
        <hr/>
        <div className='CategoryCardDescription'>
            {prop.description}
        </div>
    </div>
  )
}
