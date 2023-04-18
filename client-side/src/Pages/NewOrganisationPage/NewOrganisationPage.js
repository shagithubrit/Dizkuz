import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './NewOrganisationPage.css';
import { useNavigate} from 'react-router-dom';
import { set } from 'mongoose';

export default function NewOrganisationPage() {
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

    const AddNewUser = (e) => {
        e.preventDefault();
        console.log( "xx");
        if( NewUserID == ''){
            window.alert( 'Please Add User ID');
        }else{
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
    <div>
        <>
            <NavBar />
            <div className='NewOrganisationContainer'>
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
