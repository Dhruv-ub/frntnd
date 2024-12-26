// src/components/DragDropFlow.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const FlowContainer = styled.div`
  background: #f0f4f8;
  padding: 20px;
  border-radius: 8px;
`;

const ApiCard = styled.div`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

function DragDropFlow() {
  const [apiConfigs, setApiConfigs] = useState([]);

  useEffect(() => {
    async function fetchApiConfigs() {
      try {
        const response = await axios.get('http://localhost:5000/api/config');
        setApiConfigs(response.data || []); // Ensure the array is not null/undefined
      } catch (error) {
        console.error('Error fetching API configs:', error);
      }
    }
    fetchApiConfigs();
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const items = Array.from(apiConfigs);
    const [movedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, movedItem);

    setApiConfigs(items);
  };

  return (
    <FlowContainer>
      <h2>API Flow</h2>
      {apiConfigs.length > 0 ? ( // Ensure DragDropContext only renders if data is present
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ minHeight: '100px' }} // Prevents layout collapse
              >
                {apiConfigs.map((config, index) => (
                  <Draggable key={config._id} draggableId={config._id} index={index}>
                    {(provided) => (
                      <ApiCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h4>{config.name}</h4>
                        <p>Method: {config.method}</p>
                        <p>URL: {config.url}</p>
                      </ApiCard>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <p>Loading API configurations...</p>
      )}
    </FlowContainer>
  );
}

export default DragDropFlow;


