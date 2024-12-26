import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApiDetailsPage.css';

function ApiDetailsPage() {
  const [apiConfigs, setApiConfigs] = useState([]); // Store all API configurations
  const [selectedApi, setSelectedApi] = useState(null); // API selected for update
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Fetch all APIs on component load
  useEffect(() => {
    const fetchApiConfigs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/config');
        setApiConfigs(response.data);
      } catch (error) {
        console.error('Error fetching API configurations:', error);
      }
    };

    fetchApiConfigs();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/config/${id}`);
      alert('API deleted successfully');
      setApiConfigs(apiConfigs.filter((api) => api._id !== id));
    } catch (error) {
      console.error('Error deleting API:', error);
    }
  };

  // Handle update action
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/config/${selectedApi._id}`, selectedApi);
      alert('API updated successfully');
      setApiConfigs(
        apiConfigs.map((api) => (api._id === selectedApi._id ? selectedApi : api))
      );
      setShowModal(false); // Close modal
    } catch (error) {
      console.error('Error updating API:', error);
    }
  };

  // Handle input changes in the update form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedApi((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="api-details-page">
      <h2>API Configurations</h2>

      {/* Display all APIs as cards */}
      <div className="api-cards">
        {apiConfigs.length > 0 ? (
          apiConfigs.map((api) => (
            <div className="card" key={api._id}>
              <h3>{api.name}</h3>
              <p><strong>Method:</strong> {api.method}</p>
              <p><strong>URL:</strong> {api.url}</p>
              <p><strong>Headers:</strong> {JSON.stringify(api.headers)}</p>
              <p><strong>Body:</strong> {JSON.stringify(api.body)}</p>
              <p><strong>Sample Response:</strong> {JSON.stringify(api.sampleResponse)}</p>

              <div className="card-actions">
                <button onClick={() => { setSelectedApi(api); setShowModal(true); }}>Update</button>
                <button onClick={() => handleDelete(api._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No API configurations found.</p>
        )}
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update API Config</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={selectedApi.name || ''}
                onChange={handleChange}
              />
              <input
                type="text"
                name="method"
                placeholder="Method (GET, POST, etc.)"
                value={selectedApi.method || ''}
                onChange={handleChange}
              />
              <input
                type="text"
                name="url"
                placeholder="URL"
                value={selectedApi.url || ''}
                onChange={handleChange}
              />
              <textarea
                name="headers"
                placeholder="Headers (JSON format)"
                value={selectedApi.headers || ''}
                onChange={handleChange}
              />
              <textarea
                name="body"
                placeholder="Body (JSON format)"
                value={selectedApi.body || ''}
                onChange={handleChange}
              />
              <textarea
                name="sampleResponse"
                placeholder="Sample Response (JSON format)"
                value={selectedApi.sampleResponse || ''}
                onChange={handleChange}
              />
              <div className="modal-actions">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiDetailsPage;

