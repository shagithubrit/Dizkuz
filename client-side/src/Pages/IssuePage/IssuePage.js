import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import IssueCard from '../../Components/IssueCard';
import Button from 'react-bootstrap/Button';
import './IssuePage.css';
import Footer from '../../Components/Footer';
import NavBar from '../../Components/NavBar';
import AddImg from './AddImg.png';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Issues = [
    {
        title : 'Issue 1',
        body : 'Issue regarding test Issue 1',
        author : 'person 1',
        date : '15-10-2022',
        id : 'id 1'
    },
    {
        title : 'Issue 2',
        body : 'Issue regarding test Issue 2',
        author : 'person 2',
        date : '17-10-2022',
        id : 'id 2'
    },
    {
        title : 'Issue 3',
        body : 'Issue regarding test Issue 3',
        author : 'person 3',
        date : '15-10-2022',
        id : 'id 3'
    },
    {
        title : 'Issue 4',
        body : 'Issue regarding test Issue 4',
        author : 'person 4',
        date : '15-10-2022',
        id : 'id 4'
    },
    {
        title : 'Issue 5',
        body : 'Issue regarding test Issue 5',
        author : 'person 5',
        date : '15-10-2022',
        id : 'id 5'
    },
    {
        title : 'Issue 6',
        body : 'Issue regarding test Issue 6',
        author : 'person 6',
        date : '15-10-2022',
        id : 'id 6'
    }
];

function NewIssueModal(props) {
    const addIssue = () => {
        props.onHide();
    }
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Issue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Enter Issue name" style={{marginBottom : '5px'}} />
          <Form.Control type="textarea" placeholder="Enter Issue description" style={{marginTop : '5px'}} />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addIssue}>
              Create
            </Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default function IssuePage() {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = React.useState(false);

    const IssueComponent = Issues.map(( issue) =>{
        return(
        <div>
            <IssueCard title={issue.title} body={issue.body} id={issue.id} author={issue.author} date={issue.date} key={issue.id}/>
        </div>
        );
      });

      const JumpToAddIssue = () => {
        setModalShow( true);
      }


      let currentUser_ = {};
    
      useEffect( () => {
        currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
        if( currentUser_ == null){
          navigate( '/landing');
        }
      }, []);

  return (
    <>
    <NavBar />
    <div className='IssuePageOuterContainer' style={{paddingTop : '70px'}}>
        <h3 style={{textAlign: 'center'}}>Issues</h3>
        <hr/>
        <div className='IssuePageContainer'>
            <div className='NewIssue' onClick={JumpToAddIssue}>
                <div>
                    <div className='NewIssueCont'>
                        <img src={AddImg} height={'100px'}/>
                    </div>
                    <div>Add new issue</div>
                </div>
            </div>
            {IssueComponent}
        </div>
    </div>
    <NewIssueModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    <Footer />
    </>
  );
}
