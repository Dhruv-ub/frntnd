
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ConfigFormContainer = styled.div`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  padding: 20px;
  border-radius: 8px;
  color: white;
  margin: 20px 0;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
`;

const SubmitButton = styled.button`
  background-color: #2575fc;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #6a11cb;
  }
`;

function ConfigForm() {
  const [name, setName] = useState('');
  const [method, setMethod] = useState('');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');

  const safeParseJSON = (input) => {
    try {
      return input ? JSON.parse(input) : {};
    } catch (error) {
      console.error('Invalid JSON:', error);
      return {};
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newConfig = {
      name,
      method,
      url,
      headers: safeParseJSON(headers),
      body: safeParseJSON(body),
      sampleResponse: safeParseJSON(response),
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/config`, newConfig);
      alert('API Config Created');
    } catch (error) {
      console.error('Error creating API config:', error);
      alert('Error creating API config. Please check the console for details.');
    }
  };

  return (
    <ConfigFormContainer>
      <h2>Create API Config</h2>
      <form onSubmit={handleSubmit}>
        <InputField 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <InputField 
          type="text" 
          placeholder="Method (GET, POST, etc.)" 
          value={method} 
          onChange={(e) => setMethod(e.target.value)} 
        />
        <InputField 
          type="text" 
          placeholder="URL" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
        />
        <InputField 
          type="text" 
          placeholder="Headers (JSON format)" 
          value={headers} 
          onChange={(e) => setHeaders(e.target.value)} 
        />
        <InputField 
          type="text" 
          placeholder="Body (JSON format)" 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
        />
        <InputField 
          type="text" 
          placeholder="Sample Response (JSON format)" 
          value={response} 
          onChange={(e) => setResponse(e.target.value)} 
        />
        <SubmitButton type="submit">Create API Config</SubmitButton>
      </form>
    </ConfigFormContainer>
  );
}

export default ConfigForm;
