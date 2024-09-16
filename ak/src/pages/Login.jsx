import React,{useState} from "react";
import{auth} from '../firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import{ref,set} from 'firebase/database'
import{Box,Button,Input,FormControl,Formlabel}from '@chakra-ui/react';
import{useNavigate} from 'react-router-dom'

const Login=()=>{
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()

    const handleLogin=async()=>{
        try{
              await signInWithEmailAndPassword(auth,email,password)
              navigate('./books');
        }catch(error){
            console.log(error);
        }
    }

    return(
        <Box p={5}>
            <FormControl mb={4}>
                <Formlabel>Email</Formlabel>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>
            <FormControl mb={4}>
            <Formlabel>Password</Formlabel>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </FormControl>
            <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
        </Box>
    )
}

export default Login;