import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import IssueCard from '../../Components/IssueCard';
import './IssuePage.css';
import Footer from '../../Components/Footer';
import NavBar from '../../Components/NavBar';

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
]

export default function IssuePage() {
    const navigate = useNavigate();

    const IssueComponent = Issues.map(( issue) =>{
        return(
        <div>
            <IssueCard title={issue.title} body={issue.body} id={issue.id} author={issue.author} date={issue.date} key={issue.id}/>
        </div>
        );
      });

      const [ currentUser, setCurrentUser] = useState({
        name : null,
        email : null,
        password : null,
        organisations : [],
        messages : 0
      });
    
      useEffect( () => {
        const currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser( currentUser_);
    
        if( currentUser.name == null){
          navigate( '/landing');
        }
    
      }, []);

  return (
    <>
    <NavBar />
    <div className='IssuePageOuterContainer' style={{paddingTop : '100px'}}>
        <h3 style={{textAlign: 'center'}}>Issues</h3>
        <hr/>
        <div className='IssuePageContainer'>
            {IssueComponent}
        </div>
    </div>
    <Footer />
    </>
  );
}
