import React from 'react'
import './Components.css';

export default function Footer() {
  return (
    <div className='FooterContainer'>
        <p style={{textAlign:'centre'}}><b>Created in 2023</b></p>
        <hr/>
        <div style={{textAlign: 'start'}}>
            <p>@Authors : </p>
            <a href='https://github.com/adityarai0705'>Aditya Raj Rai</a>
            <br/>
            <a href='https://github.com/ishavishwakarma29'>Isha Vishwakarma</a>
            <br/>
            <a href='https://github.com/Aishwaryavikramsingh'>Aishwarya Vikarm Singh</a>
            <br/>
            <a href='https://github.com/aditya-mnnit'>Aditya Singh Yadav</a>
        </div>
    </div>
  )
}
