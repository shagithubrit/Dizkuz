import React from 'react'
import Login_img from './Landing_img.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginPage.css'

export default function LoginPage() {
  return (
    <>
    <div className='LoginContainer'>
        <div className='LoginPageContainer'>
            <div className='LoginPageChild1'>
                <img src={Login_img} alt='img' />
            </div>
            <div className='LoginPageChild2'>
            <Form>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            </div>
        </div>
    </div>
    </>
  )
}
