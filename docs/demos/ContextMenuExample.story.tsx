import React, { createContext, useContext, useState } from 'react';
import { GraphCanvas, RadialMenu } from '../src';
import { simpleNodes, simpleEdges } from '../docs/assets/demo';

// Example React context that would be lost with Html component
const UserContext = createContext<{ user: string; theme: string } | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UserContext.Provider value={{ user: 'John Doe', theme: 'dark' }}>
      {children}
    </UserContext.Provider>
  );
};

// Component that uses React context
const ContextAwareMenu: React.FC<{
  data: any;
  onClose: () => void;
}> = ({ data, onClose }) => {
  const userContext = useContext(UserContext);
  
  if (!userContext) {
    return (
      <div style={{
        background: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '4px'
      }}>
        ❌ Context Lost! User context is not available.
      </div>
    );
  }

  return (
    <div style={{
      background: userContext.theme === 'dark' ? '#333' : '#fff',
      color: userContext.theme === 'dark' ? '#fff' : '#333',
      padding: '10px',
      borderRadius: '4px',
      border: '2px solid green'
    }}>
      ✅ Context Preserved!
      <br />
      User: {userContext.user}
      <br />
      Theme: {userContext.theme}
      <br />
      Node: {data.label}
      <br />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export const ContextMenuExample = () => {
  return (
    <UserProvider>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <GraphCanvas
          nodes={simpleNodes}
          edges={simpleEdges}
          contextMenu={({ data, onClose }) => (
            <ContextAwareMenu data={data} onClose={onClose} />
          )}
        />
      </div>
    </UserProvider>
  );
};

export default {
  title: 'Examples/Context Menu with React Context',
  component: ContextMenuExample
};
