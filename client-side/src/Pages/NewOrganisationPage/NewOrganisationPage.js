import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './NewOrganisationPage.css';
import { useNavigate} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

export default function NewOrganisationPage() {
    const [ alertHead, setAlertHead] = useState( "");
    const [ alertBody, setAlertBody] = useState( "");
    const [show, setShow] = useState(false);


    const navigate = useNavigate();
    const[ participants, setParticipants] = useState( []);
    const[ dummy, setDummy] = useState( true);
    let OrganisationName = '';
    let NewUserID = '';
    let currentUser_ = {};

    let participants_ = participants;
    let participantComponent = participants_.map( (participant) => {
        return (
        <>
            <p>{participant}</p>
            </>
        );
    });


    
    const handleInputName = (e) => {
        OrganisationName = e.target.value;
        console.log('orgName : ', OrganisationName);
      };

    const handleID = (e) => {
        NewUserID = e.target.value;
        console.log('newID : ', NewUserID);
    };

    const AddNewUser = async (e) => {
        e.preventDefault();
        console.log( "xx");
        if( NewUserID == ''){
            setAlertHead( "UserID is empty!");
            setAlertBody( "The userID cannot be an empty string. Please enter userID.");
            setShow( true);
        }else{
            const checkID = {
                userID : NewUserID
            };
            try {
                const response = await fetch("http://localhost:8080/checkuserid", {
                  method: "POST",
                  body: JSON.stringify( checkID),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                  const data = await response.json();
                  console.log(JSON.stringify(data));
                  // if no user is found then null is returned
                  if (data.status == 'Found') {
                      setAlertHead( "User Added Succesfully!");
                      setAlertBody( "The user has been added to the organisation");
                      setShow( true);
                  }
                  else
                  {
                      setAlertHead( "User not found!");
                      setAlertBody( "The userID you entered does not exist in our database. Please check it and try again.");
                      setShow( true);
                  }
              } catch (error) {
                console.log(error);
                setAlertHead( "Unknown error occured!");
                setAlertBody( "An unknown error occured. please check your network and try again.");
                setShow( true);
              }

            // a program to check if userID exists is to be written here.
            console.log( participants);
            let arr = participants;
            arr.push( NewUserID);
            setParticipants( arr);
            console.log( participants);
            setDummy( !dummy);
            document.getElementsByClassName( 'newUserIDUserInput')[ 0].value = '';
        }
    }

    useEffect( () => {
        currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
        if( currentUser_ == null){
          navigate( '/landing');
        }
      }, []);

  return (
    show ? 
    <div>
        <div style={{height : '50px'}}></div>
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{alertHead}</Alert.Heading>
            <p>
                {alertBody}
            </p> 
        </Alert> 
        <>
            <NavBar />
            <div className='NewOrganisationContainer' style={{paddingTop : '0px'}}>
                <h4>Create New Organisation</h4>
                <div className='NewOrganisationSubContainer'>
                    <Form className='NewOrganisationSubContainer2'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Organisation's name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your organisation's name" name='organisationName' onChange={handleInputName} required/>
                            <Form.Text className="text-muted">
                            Name of an organisation can never be changed again.
                            </Form.Text>
                        </Form.Group>

                        <div className='participantContainer'>
                            <b>Users</b>
                            <hr/>
                            <div style={{textAlign : 'start'}}> 
                                {participantComponent}
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Add user</Form.Label>
                            <Form.Control type="text" placeholder="Enter the ID of the user" name='newUserID' onChange={handleID} className='newUserIDUserInput'/>
                            <Form.Text className="text-muted">
                            Leave it blank if you don't want to add more users.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="outline-primary" className='newOrgButton' onClick={AddNewUser}>
                            Add User
                        </Button>
                        <Button variant="primary" type="submit" className='newOrgButton'>
                            Create Organisation
                        </Button>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    </div>
    :
    <div>
        <>
            <NavBar />
            <div className='NewOrganisationContainer' style={{paddingTop : '100px'}}>
                <h4>Create New Organisation</h4>
                <div className='NewOrganisationSubContainer'>
                    <Form className='NewOrganisationSubContainer2'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Organisation's name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your organisation's name" name='organisationName' onChange={handleInputName} required/>
                            <Form.Text className="text-muted">
                            Name of an organisation can never be changed again.
                            </Form.Text>
                        </Form.Group>

                        <div className='participantContainer'>
                            <b>Users</b>
                            <hr/>
                            <div style={{textAlign : 'start'}}> 
                                {participantComponent}
                            </div>
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Add user</Form.Label>
                            <Form.Control type="text" placeholder="Enter the ID of the user" name='newUserID' onChange={handleID} className='newUserIDUserInput'/>
                            <Form.Text className="text-muted">
                            Leave it blank if you don't want to add more users.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="outline-primary" className='newOrgButton' onClick={AddNewUser}>
                            Add User
                        </Button>
                        <Button variant="primary" type="submit" className='newOrgButton'>
                            Create Organisation
                        </Button>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    </div>
  )
}
