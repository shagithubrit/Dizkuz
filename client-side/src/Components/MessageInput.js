import React from 'react';
import './Components.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function MessageInput() {
  return (
    <div className='MessageInputBar'>
        <div className='MessageBar'>
            <Form className='Inputmsg'>
                <Form.Control type="text" placeholder="Enter your message" />
            </Form>
            <Button className='sendBtn' variant="outline-success">Send</Button>
        </div>
    </div>
  )
}
