import React,{useState,useContext} from "react";
import{Box,Button,Image,Text,Input,FormControl,FormLabel,Textarea} from '@chakra-ui/react'
import{ref,set} from 'firebase/database'
import{db} from '../firebaseCOnfig'
import { AuthContext } from "./AuthContext"
import {useNavigate} from 'react-router-dom'

const AddBook=()=>{
    const {user}=useContext(AuthContext)
    const [title,setTitle]=useState('')
    const [author,setAuthor]=useState('')
    const [description,setDescription]=useState('')
    const [cover,setcover]=useState('')
    const [genre,setGenre]=useState('')
    const [publicationDate,setPublicationDate]=useState('')
    const navigate=useNavigate();

    const handleAddBook=async()=>{
        if(user && user.isAdmin){
            const newBook=ref(db,`books/${Date.now()}`);
            await set(newBook,{
                title,author,cover,genre,publicationDate
        });
        navigate('/books');
        }
    };
    if(!user || !user.isAdmin){
        navigate('./books');
        return null;
    }
    return(
        <Box p={5}>
            <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <input value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </FormControl>
            
            <FormControl mb={4}>
                <FormLabel>Author</FormLabel>
                <input value={author} onChange={(e)=>setAuthor(e.target.value)}/>
            </FormControl>
            
            <FormControl mb={4}>
                <FormLabel>Cover URL</FormLabel>
                <input value={cover} onChange={(e)=>setcover(e.target.value)}/>
            </FormControl>
            
            <FormControl mb={4}>
                <FormLabel>Genre</FormLabel>
                <input value={genre} onChange={(e)=>setGenre(e.target.value)}/>
            </FormControl>
            
            <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <input value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </FormControl>
            
            <FormControl mb={4}>
                <FormLabel>Publication Date</FormLabel>
                <input value={publicationDate} onChange={(e)=>setPublicationDate(e.target.value)}/>
            </FormControl>
            <Button colorScheme="blue" onClick={handleAddBook}>Add Book</Button>
        </Box>
    )
}
export default AddBook