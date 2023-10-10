import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  float: right;
`;

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // ... (rest of the component remains the same)

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email:</Label>
          <Input type="email" value={email} onChange={handleEmailChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Subject:</Label>
          <Input type="text" value={subject} onChange={handleSubjectChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Message:</Label>
          <TextArea value={message} onChange={handleMessageChange} required />
        </FormGroup>
        <SubmitButton type="submit">Send</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ContactForm;
