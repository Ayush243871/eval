import React,{useState,useEffect,useContext} from "react";
import{Box,Image,Text} from '@chakra-ui/react'
import{ref,get} from 'firebase/database'
import { db } from '../Firebase';
import { AuthContext } from "./AuthContext"
import {useParams,useNavigate} from 'react-router-dom'

const BookDetails=()=>{
    const{bookId}=useParams();
    const {user}=useContext(AuthContext);
    const [book, setBook] = useState(null);
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchBooks=async()=>{
            const bookRef = ref(db,`books/${bookId}`)
            const Snapshot = await get(bookRef)
            if(Snapshot.exists()){
                setBook(Snapshot.val())
            }
        }
        fetchBooks();
    },[bookId])
    if(!user){
        navigate('/Login')
        return null;
    }
    return(
        <Box w="100%" h="100vh" p={5}>
            {book?(
                <>
                <Image src={book.cover} alt={book.title}/>
                <Text fontSize="2xl" mt={2}>{book.title}</Text>
            <Text fontSize="lg">Author:{book.author}</Text>
            <Text mt={2}>Genre:{book.genre}</Text>
            <Text mt={2}>DESCRIPTION:{book.description}</Text>
            <Text mt={2}>Publication Date:{book.publicationDate}</Text>
                </>
            ):(
                <Text>Loading...</Text>
            )}
                    </Box>
            )}
            
export default BookDetails