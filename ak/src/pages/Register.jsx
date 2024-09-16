
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../firebaseConfig';
import { Box, Button, Input, FormControl, FormLabel, Checkbox } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, {
        email,
        isAdmin,
      });

      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <Box p={5}>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <Checkbox isChecked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>
          Admin
        </Checkbox>
      </FormControl>
      <Button colorScheme="blue" onClick={handleRegister}>Register</Button>
    </Box>
  );
};

export default Register;
