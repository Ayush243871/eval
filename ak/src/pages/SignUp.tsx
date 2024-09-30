import React,{useState} from "react";
import{auth,db} from '../firebaseConfig'
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import{ref,set} from 'firebase/database'
import{Box,Button,Input,Checkbox,FormControl,Formlabel}from '@chakra-ui/react';
import{useNavigate} from 'react-router-dom'

const SignUp=()=>{
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[isAdmin,setIsAdmin]=useState(false)
    const navigate=useNavigate();

    const handleSignUp=async()=>{
    try{
        const userCredential=await createUserWithEmailAndPassword(auth,email,password)
        if(isAdmin){
            await set(ref(db,'users/'+userCredential.user.uid),{isAdmin:true});
        }
        navigate('/Login');
    }catch(error){
        console.log(error);
    }
    };
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
            <FormControl mb={4}>
                <Checkbox isChecked={isAdmin} onChange={()=>setIsAdmin(!isAdmin)}>Admin</Checkbox>
            
            </FormControl>
            <Button colorScheme="blue" onClick={handleSignUp}>Sign Up</Button>
        </Box>
    )
}
export default SignUp;