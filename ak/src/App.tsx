
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider}  from './pages/AuthContext';

import BookFeed from './components/BookFeed';
import Auth from './components/Auth';
import { useAuth } from './hooks/useAuth';
const App: React.FC = () => {
  const { user } = useAuth();

  return (
          <AuthProvider>
              <Router>
                  <Routes>
                      <Route path="/register" element={<Auth />} />
                      <Route path="/login" element={<Auth />} />
                      <Route path="/books" element={user ? <BookFeed /> : <Auth />} />
                      <Route path="/" element={user ? <BookFeed /> : <Auth />} />
                  </Routes>
              </Router>
          </AuthProvider>
    
  );
};

export default App;