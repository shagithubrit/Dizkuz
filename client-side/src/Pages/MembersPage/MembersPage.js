import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../../Components/Footer';
import NavBar from '../../Components/NavBar';
import './MembersPage.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import MemberCard from '../../Components/MemberCard';

// test data
const members = [
    {
        name : 'name',
        email : 'email',
        _id : 'id'
    },
    {
        name : 'name',
        email : 'email',
        _id : 'id'
    },
    {
        name : 'name',
        email : 'email',
        _id : 'id'
    },
    {
        name : 'name',
        email : 'email',
        _id : 'id'
    },
    {
        name : 'name',
        email : 'email',
        _id : 'id'
    },
    {
        name : 'name',
        email : 'email',
        _id : 'id'
    },
    {
        name : 'name',
        email : 'email',
        _id : 'id'
    },
    {
        name : 'name',
        email : 'email',
        _id : 'id'
    },
];

export default function MembersPage() {
  const navigate = useNavigate();

  const [ show, setShow] = useState(false);
  const [ modalShow, setModalShow] = React.useState(false);
  const [ HtmlLoaded, setHtmlLoaded] = useState( false);
  const [ Categories, setCategories] = useState( [] );
  const [ orgName, setOrgName] = useState( 'Organization');
  const [ MembersComponent, setMembersComponent] = useState(<></>);


  useEffect( () => {
    const tempMembersComponent = members.map( (member) => {
        return (<MemberCard name={member.name} email={member.email} _id={member._id} />);
      });
    setMembersComponent( tempMembersComponent);
  }, []);

  return (
    <>
        <NavBar />
        <div className='MembersHeading'>
            <h4>Members</h4>
        </div>
        <div className='MembersContainer'>
            {MembersComponent}
        </div>
        <Footer />
    </>
  )
}
