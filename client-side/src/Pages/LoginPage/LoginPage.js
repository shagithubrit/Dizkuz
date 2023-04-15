import React, { useState } from 'react'
import Login_img from './Landing_img.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginPage.css'
import { useNavigate} from 'react-router-dom';



export default function LoginPage(prop) {

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const CheckLogin = () => {
    prop.setUser( true);
    navigate( '/');
  }

   const handleInputs = (e) => {
     const Name = e.target.name;
     const Value = e.target.value;

     setUserCredentials({ ...userCredentials, [Name]: Value });
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          body: JSON.stringify(userCredentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
          const data = await response.json();
          console.log(JSON.stringify(data));
          // if no user is found then null is returned
          if (data==null) {
              window.alert("user not found");
          }
          else
          {
            const passWord = data.password;
            // check if password of returned object matches with the entered password
            if (passWord === userCredentials.password) {
              prop.setUser(true);
              navigate("/");
            }
            else
            {
              window.alert("The password entered is wrong");
            }
          }
      } catch (error) {
        console.log(error);
        window.alert("failed to login");
      }
   }


  return (
    <>
      <div className="LoginContainer">
        <div className="LoginPageContainer">
          <div className="LoginPageChild1">
            <img src={Login_img} alt="img" />
          </div>
          <div className="LoginPageChild2">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  onChange={handleInputs}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required onChange={handleInputs}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <a href="/signup">Sign up instead?</a>
          </div>
        </div>
      </div>
    </>
  );
}
