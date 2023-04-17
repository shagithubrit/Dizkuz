import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import Signup_img from './Landing_img.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SignupPage.css'
import Alert from 'react-bootstrap/Alert';

export default function SignupPage(prop) {
  const navigate = useNavigate();
  const [alertHead, setAlertHead] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertVarient, setAlertVarient] = useState("");
  const [show, setShow] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: null,
    email: null,
    password: null,
    organisations: [],
    messages: 0
  })

  const [person, setPerson] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: ""
  });

  const handleInputs = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;

    setPerson({ ...person, [Name]: Value });
  }


  const handleSubmit = async (e) => {
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
        // prop.setUser(true);

        currentUser.name = data.body.name;
        currentUser.email = data.body.email;
        currentUser.password = data.body.password;
        currentUser.organisations = data.body.organisations;
        currentUser.messages = data.body.messages;

        localStorage.setItem('currentUser', JSON.stringify(currentUser)); // saving current user in the browser's local storage.

        navigate("/");
        console.log(data);
      } catch (error) {
        console.log(error);
        setAlertHead("Signing up failed!");
        setAlertBody("Due to an unexpected error we were not able to sign you up, please check your connection try again.");
        setAlertVarient("danger");
        setShow(true);
      }
    }
    else {
      setAlertHead("Oops! Password mismatched...");
      setAlertBody("The passwords you entered didn't matched. Please check the password and try again.");
      setAlertVarient("warning");
      setShow(true);
    }
  }


  useEffect( () => {
    const currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser( currentUser_);

    if( currentUser.name != null){
      navigate( '/');
    }

  }, []);

    return (
      show ?
        <>
          <Alert variant={alertVarient} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{alertHead}</Alert.Heading>
            <p>
              {alertBody}
            </p>
          </Alert>
          <div className='SignupContainer'>
            <div className='SignupPageContainer'>
              <div className='SignupPageChild1'>
                <img src={Signup_img} alt='img' />
              </div>
              <div className='SignupPageChild2'>
                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Enter name" required onChange={handleInputs} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" required onChange={handleInputs} />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Create password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required onChange={handleInputs} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control name='cPassword' type="password" placeholder="Password" required onChange={handleInputs} />
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
        :
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
                    <Form.Control name='name' type="text" placeholder="Enter name" required onChange={handleInputs} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" required onChange={handleInputs} />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Create password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required onChange={handleInputs} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control name='cPassword' type="password" placeholder="Password" required onChange={handleInputs} />
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
