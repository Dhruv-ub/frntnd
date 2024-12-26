

import React, { useEffect, useState } from 'react';
import ConfigForm from '../components/ConfigForm';
import api from '../utils/api';  

const HomePage = () => {
  const [apiConfigs, setApiConfigs] = useState([]);
  
  useEffect(() => {
    const fetchApiConfigs = async () => {
      try {
        const response = await api.get('/api-configs'); 
        setApiConfigs(response.data);
      } catch (error) {
        console.error("Error fetching API configs:", error);
      }
    };

    fetchApiConfigs();
  }, []);  
  return (
    <div className="home-page-container">
      <div className="form-container">
        <ConfigForm />
      </div>
      <div>
        <ul>
          {apiConfigs.map((config) => (
            <li key={config._id}>{config.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
