
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCorners,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';

const APIFlow = () => {
  const [apiConfigs, setApiConfigs] = useState([]);

  // Fetch APIs on component mount
  useEffect(() => {
    const fetchApiConfigs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/config'); // Replace with your correct API endpoint
        setApiConfigs(response.data);
      } catch (error) {
        console.error('Error fetching API configurations:', error);
      }
    };

    fetchApiConfigs();
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = apiConfigs.findIndex((api) => api._id === active.id);
      const newIndex = apiConfigs.findIndex((api) => api._id === over.id);

      // Reorder the APIs in frontend
      const updatedApiConfigs = arrayMove(apiConfigs, oldIndex, newIndex);

      setApiConfigs(updatedApiConfigs);

      // Update the order in the database
      try {
        await axios.put('http://localhost:5000/api/config/updateOrder', {
          apiConfigs: updatedApiConfigs, // Send the updated order
        });
      } catch (error) {
        console.error('Error updating API order:', error);
      }
    }
  };

  return (
    <div className="api-flow-container" style={styles.container}>
      <h2 style={styles.header}>API Flow</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={apiConfigs.map((api) => api._id)}>
          <div className="api-list" style={styles.apiList}>
            {apiConfigs.length === 0 ? (
              <p>No APIs available</p>
            ) : (
              apiConfigs.map((api) => (
                <SortableItem key={api._id} api={api} />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableItem = ({ api }) => {
  const { setNodeRef, attributes, listeners, isDragging } = useSortable({
    id: api._id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...styles.apiItem,
        ...(isDragging ? styles.draggingItem : {}),
      }}
    >
      <h3>{api.name}</h3>
      <p><strong>Method:</strong> {api.method}</p>
      <p><strong>URL:</strong> {api.url}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f9f9f9',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  apiList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    padding: '0 20px',
  },
  apiItem: {
    backgroundColor: '#fff',
    marginBottom: '15px',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    width: '100%',
    cursor: 'move',
    transition: 'transform 0.3s ease',
    zIndex: 1,
  },
  draggingItem: {
    backgroundColor: '#ddd',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)',
    zIndex: 9999,
  },
};

export default APIFlow;







