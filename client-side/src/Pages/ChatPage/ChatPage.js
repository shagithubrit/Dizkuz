import React, { useState, useEffect } from 'react'
import Alert from "react-bootstrap/Alert";
import { useNavigate} from 'react-router-dom';
import MessageCardOther from '../../Components/MessageCardOther';
import MessageCardUser from '../../Components/MessageCardUser';
import './ChatPage.css';
import MessageInput from '../../Components/MessageInput';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import Spinner from 'react-bootstrap/esm/Spinner';
// Messages
// const messages = [
//     {
//         author : 'Ambani',
//         text : 'Hello!',
//         dateTime : '7:30 AM 24th April 2022',
//         userAuth : false
//     },
// ];

export default function ChatPage() {
    const navigate = useNavigate();

    const [ HtmlLoaded, setHtmlLoaded] = useState( false);
    const [ messages, setMessages] = useState( []);
    const [ MessageComponent, setMessageComponent] = useState( <></>);
    const [ alertHead, setAlertHead] = useState("");
    const [ alertBody, setAlertBody] = useState("");
    const [ alertVarient, setAlertVarient] = useState("");
    const [ show, setShow] = useState(false);

    

    let currentUser_ = {};

    useEffect( () => {
    currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
    if( currentUser_ == null){
        navigate( '/landing');
    }

    const doWork = async() => {
        const dizkuzData = JSON.parse(localStorage.getItem('currentUser'));
        const IssID = dizkuzData.currentIssue;

        
        

        const tempMessageComponent = messages.map(( message) =>{
            return(
            message.userAuth ?
            <div>
                <MessageCardOther author={message.author} text={message.text} dateTime={message.dateTime} />
            </div>
            :
            <div>
                <MessageCardUser author={message.author} text={message.text} dateTime={message.dateTime} />
            </div>
            );
        });

        setMessageComponent( tempMessageComponent);

        setHtmlLoaded( true);
    }

    doWork();
    }, []);

  return (
    HtmlLoaded ?
    show?
    <>
        <NavBar />
            <div  style={{paddingTop : '50px'}}>
                <Alert variant={alertVarient} onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{alertHead}</Alert.Heading>
                    <p>
                    {alertBody}
                    </p>
                </Alert>
                <div className='ChatPageContainer' style={{paddingTop : '0px'}}>
                    <div className='ChatPageContainer2'>
                        {MessageComponent}
                    </div>
                </div>
            </div>
        <Footer />
    </>
    :
    <>
        <NavBar />
        <div className='ChatPageContainer'>
            <div className='ChatPageContainer2'>
                {MessageComponent}
            </div>
        </div>
        <MessageInput />
    </>
    :
    <>
      <NavBar />
        <div className='SpinnerContainer'>
            <Spinner animation="border" variant="dark" />
        </div>
      <Footer />
    </>
  )
}
