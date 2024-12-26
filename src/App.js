
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ApiDetailsPage from './pages/ApiDetailsPage';
import UpdateConfigPage from './pages/UpdateConfigPage';  // Import the UpdateConfigPage
import Header from './components/Header';
import './styles/App.css'; // Import global styles
import APIFlow from './pages/APIFlow'; // Adjust the path based on your folder structure

function App() {
  return (
    <Router>
      <Header />
      <div className="app-container">
        <Routes>
          {/* Home page for configuring APIs and managing workflows */}
          <Route path="/" element={<HomePage />} />
          
          {/* Detailed page to view execution results of a specific API */}
          <Route path="/api-details/:id" element={<ApiDetailsPage />} />
          
          {/* New Route for the Update Config Page */}
          <Route path="/update-config/:id" element={<UpdateConfigPage />} />

          {/* New Route for the API Flow page */}
          <Route path="/api-flow" element={<APIFlow />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
