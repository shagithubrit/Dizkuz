import React, {useState} from 'react'
import Signup_img from './Landing_img.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SignupPage.css'
import { useNavigate, useHistory} from 'react-router-dom';

export default function SignupPage(prop) {
  const navigate = useNavigate();

  const [person, setPerson] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: ""
  });

  const handleInputs = (e) =>
  {
    const Name = e.target.name;
    const Value = e.target.value;

    setPerson({...person, [Name]: Value});
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (person.password === person.cPassword) {
      try {
        const response = await fetch("http://localhost:8080/signUp", {
          method: "POST",
          body: JSON.stringify(person),
          headers: {
            "Content-Type": "application/json",
          },
        });
          const data = await response.json();
          prop.setUser(true);
          navigate("/");
          console.log(data);
      } catch (error) {
        console.log(error);
        window.alert("failed to sign up");
      }
  }
  else
  {
    window.alert("Ouch! The passwords didn't match");
  }
}

  return (
    <>
    <div className='SignupContainer'>
        <div className='SignupPageContainer'>
            <div className='SignupPageChild1'>
                <img src={Signup_img} alt='img' />
            </div>
            <div className='SignupPageChild2'>
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' type="text" placeholder="Enter name"  required onChange={handleInputs}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required onChange={handleInputs}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Create password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required onChange={handleInputs}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control name='cPassword' type="password" placeholder="Password" required onChange={handleInputs}/>
              </Form.Group>

              <Button variant="primary" type="submit">
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
