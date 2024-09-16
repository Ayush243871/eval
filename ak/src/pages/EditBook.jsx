import React,{useState,useEffect,useContext} from "react";
import{Box,Button,Image,Text,Input,FormControl,FormLabel,Textarea} from '@chakra-ui/react'
import{ref,set,get} from 'firebase/database'
import{db} from '../firebaseCOnfig'
import { AuthContext } from "./AuthContext"
import {useNavigate,useParams} from 'react-router-dom'

const EditBook=()=>{
    const {user}=useContext(AuthContext)
    const {bookId}=useParams()
    const [title,setTitle]=useState('')
    const [author,setAuthor]=useState('')
    const [description,setDescription]=useState('')
    const [cover,setcover]=useState('')
    const [genre,setGenre]=useState('')
    const [publicationDate,setPublicationDate]=useState('')
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchBooks=async()=>{
            const bookRef=ref(db,`books/${bookId}`);
            const snapshot=await get(bookRef)
            if(snapshot.exists()){
                const Data=snapshot.val()
                setTitle(data.title);
                setAuthor(data.author);
                setDescription(data.description);
                setcover(data.cover);
                setGenre(data.genre);
                setPublicationDate(data.publicationDate);
            }
        }
        fetchBooks();
    },[bookId])

    const handleEditBook=async()=>{
        if(user && user.isAdmin){
            const bookRef=ref(db,`books/${bookId}`);
            await set(bookRef,{
                title,author,cover,genre,description,publicationDate
        });
        navigate(`/books/${bookId}`);
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
            <Button colorScheme="blue" onClick={handleEditBook}>Update Book</Button>
        </Box>
    )
}
export default EditBook