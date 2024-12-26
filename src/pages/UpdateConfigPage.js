
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

function UpdateConfigPage() {
  const { id } = useParams(); // Get the ID from URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [method, setMethod] = useState('');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Fetch the existing API config details
    const fetchConfig = async () => {
      try {
        const result = await axios.get(`${API_BASE_URL}/api/config/${id}`);
        const data = result.data;

        setName(data.name);
        setMethod(data.method);
        setUrl(data.url);
        setHeaders(JSON.stringify(data.headers, null, 2));
        setBody(JSON.stringify(data.body, null, 2));
        setResponse(JSON.stringify(data.sampleResponse, null, 2));
      } catch (error) {
        console.error('Error fetching config data:', error);
      }
    };

    fetchConfig();
  }, [id, API_BASE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedConfig = {
      name,
      method,
      url,
      headers: JSON.parse(headers),
      body: JSON.parse(body),
      sampleResponse: JSON.parse(response),
    };

    try {
      await axios.patch(`${API_BASE_URL}/api/config/${id}`, updatedConfig);
      alert('API Config Updated');
      navigate(`/api-details/${id}`); // Redirect to the details page after update
    } catch (error) {
      console.error('Error updating API config:', error);
    }
  };

  return (
    <ConfigFormContainer>
      <h2>Update API Config</h2>
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
        <SubmitButton type="submit">Update API Config</SubmitButton>
      </form>
    </ConfigFormContainer>
  );
}

export default UpdateConfigPage;
