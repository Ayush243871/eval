

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button, Input, FormControl, FormLabel, Stack } from '@chakra-ui/react';

const Auth: React.FC = () => {
    const { login, register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegistering) {
            await register(email, password);
        } else {
            await login(email, password);
        }
    };

    return (
        <form onSubmit={handleAuth}>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={4}>
                <Button type="submit">{isRegistering ? 'Register' : 'Login'}</Button>
                <Button onClick={() => setIsRegistering(!isRegistering)}>
                    Switch to {isRegistering ? 'Login' : 'Register'}
                </Button>
            </Stack>
        </form>
    );
};

export default Auth;