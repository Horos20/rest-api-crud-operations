import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Logs from './components/Logs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="logs" element={<Logs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

