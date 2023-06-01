/* eslint-disable prettier/prettier */
import React from 'react';
import './app.scss';
import { AppProvider } from './store';
import Login from './features/Login';
import Posts from './features/Posts';
import Bwl from './features/bwl';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Bwl />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/posts" element={<Posts />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
export default App;
