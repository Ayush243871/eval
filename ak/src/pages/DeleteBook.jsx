
import React, { useContext } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebaseConfig';
import { AuthContext } from './AuthContext';
import { Button } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBook = () => {
  const { user } = useContext(AuthContext);
  const { bookId } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = async () => {
    if (user && user.isAdmin) {
      const bookRef = ref(db, `books/${bookId}`);
      await remove(bookRef);
      navigate('/books');
    }
  };

  if (!user || !user.isAdmin) {
    navigate('/books');
    return null;
  }

  return (
    <Button colorScheme="red" onClick={handleDeleteBook}>Delete Book</Button>
  );
};

export default DeleteBook;
