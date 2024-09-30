import React,{useState,useContext, useEffect} from "react";
import{Box,Image,Text,Input,SimpleGrid,Card,CardBody} from '@chakra-ui/react'
import{onValue, ref,set} from 'firebase/database'
import{db} from '../firebaseCOnfig'
import { AuthContext } from "./AuthContext"
import {useNavigate,useParams} from 'react-router-dom'

const GenrePage=()=>{
   const {genre}=useParams();
   const {user}=useContext(AuthContext)
   const [book,setBooks]=useState([]);
   const navigate=useNavigate();

   useEffect(()=>{
    const fetchBooks=()=>{
        const booksRef=ref(db,'books');
        onValue(booksRef,(snapshot)=>{
            const data=snapshot.val();
            const bookList=data ? Object.keys(data).map(key=>({id:key,...data[key]})):[];
            const filteredBooks=bookList.filter(book=>book.genre.toLowerCase()===genre.toLowerCase());
            setBooks(filteredBooks);
        })
    }
    fetchBooks();

   },[genre])

   if(!user){
    navigate('./Login')
    return null;
   }

    
    return(
        <Box p={5}>
            <SimpleGrid columns={3} spacing={5}>
                {books.map(book=>(
                    <Card key={book.id} onClick={()=>navigate(`/books/${book.id}`)}>
                        <CardBody>
                            <Image src={book.cover} alt={book.title} />
                            <Text fontSize='lg'>{book.title}</Text>
                            <Text fontSize='md'>{book.author}</Text>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
           </Box>
            
          
         
    )
}
export default GenrePage