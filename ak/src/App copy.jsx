
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../pages/AuthContext';
import Navbar from '../components/Navbar';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Books from '../pages/books';
import BookDetails from '../pages/BookDetails';
import AddBook from '../pages/AddBook';
import EditBook from '../pages/EditBook';
import GenrePage from '../pages/GenrePage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/books/:genre" element={<GenrePage />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book/:bookId" element={<EditBook />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
