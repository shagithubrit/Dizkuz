import React from 'react'
import Landing_img from './Landing_img.jpg';
import Button from 'react-bootstrap/Button';
import './LandingPage.css'

export default function LandingPage() {
  return (
    <>
    <div className='LandingContainer'>
        <div className='LandingPageContainer'>
            <div className='LandingPageChild1'>
                <img src={Landing_img} alt='img' />
            </div>
            <div className='LandingPageChild2'>
                <h1>Welcome to <b>Dizkuz</b></h1>
                <Button className='button' variant="primary">Login</Button>
                <Button className='button' variant="primary">Sig nup</Button>{' '}
            </div>
        </div>
    </div>
    </>
  )
}
