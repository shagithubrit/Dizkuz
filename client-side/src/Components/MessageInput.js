import React, { useState } from 'react';
import './Components.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function MessageInput() {
  const [ message, setMessage] = useState( "");

  const updateMessage = (e) => {
    setMessage( e.target.value);
  };

  const sendMessage = async() => {
    
  }


  return (
    <div className='MessageInputBar'>
        <div className='MessageBar'>
            <Form className='Inputmsg'>
                <Form.Control type="text" placeholder="Enter your message" onChange={updateMessage} value={message}/>
            </Form>
            <Button className='sendBtn' variant="outline-success" onClick={sendMessage}>Send</Button>
        </div>
    </div>
  )
}
