import React from 'react'
import Signup_img from './Landing_img.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SignupPage.css'
import { useNavigate} from 'react-router-dom';

export default function SignupPage(prop) {
  const navigate = useNavigate();

  const CheckSignup = () => {
    prop.setUser( true);
    navigate( '/');
  }

  return (
    <>
    <div className='SignupContainer'>
        <div className='SignupPageContainer'>
            <div className='SignupPageChild1'>
                <img src={Signup_img} alt='img' />
            </div>
            <div className='SignupPageChild2'>
            <Form>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Create password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={CheckSignup}>
                Sign up
              </Button>
            </Form>
            <a href='/login'>Login instead?</a>
            </div>
        </div>
    </div>
    </>
  )
}
