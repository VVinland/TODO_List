import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import UserStore from './store/UserStore.js';
import TaskStore from './store/TaskStore.js';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user:new UserStore(),
    task:new TaskStore(),
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>

);
