import React from 'react';
import './Components.css';

export default function CategoryCard(prop) {

  const openCategory = () => {
    console.log( "Category ID : ", prop.id);
  }

  return (
    <div className='CategoryCardOuter' onClick={openCategory}>
        <div className='CategoryCardTitle'>
            <h4>{prop.title}</h4>
        </div>
        <hr/>
        <div className='CategoryCardDescription'>
            <small>ID : {prop.id}</small>
        </div>
    </div>
  )
}
