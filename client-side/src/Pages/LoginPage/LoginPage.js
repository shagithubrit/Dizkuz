import React, { useState } from 'react'
import Login_img from './Landing_img.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginPage.css'
import { useNavigate} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


export default function LoginPage(prop) {
  const [ alertHead, setAlertHead] = useState( "");
  const [ alertBody, setAlertBody] = useState( "");
  const [show, setShow] = useState(false);

  const [ currentUser, setCurrentUser] = useState({
    name : null,
    email : null,
    password : null,
    organisations : [],
    messages : 0
  });

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
              // window.alert("user not found");
              setAlertHead( "User not found!");
              setAlertBody( "The email you used to login is not present in our database. Please try to recall your email and try again.");
              setShow( true);
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
              // window.alert("The password entered is wrong");
              setAlertHead( "Incorrect password!");
              setAlertBody( "The password you entered is not the correct password for the account " + userCredentials.email + ". Please recall your password and try again.");
              setShow( true);
            }
          }
      } catch (error) {
        console.log(error);
        // window.alert("failed to login");
        setAlertHead( "Login failed!");
        setAlertBody( "Due to an unexpected error we were not able to log you in, please check your connection try again.");
        setShow( true);
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
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>{alertHead}</Alert.Heading>
      <p>
        {alertBody}
      </p> 
    </Alert> 
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
    :
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
