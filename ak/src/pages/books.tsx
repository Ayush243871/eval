import React,{useState,useEffect,useContext} from "react";
import{Box,Button,Input,SimpleGrid,Card,CardBody,Image,Text} from '@chakra-ui/react'
import{refef,onValue,query,orderByChild} from 'firebase/database'
import { db } from '../Firebase';

import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Books=()=>{
    const{user}=useContext(AuthContext);
    const[books,setBooks]=useState([])
    const[search,setSearch]=useState("")
    const[sortOrder,setSortOrder]=useState('desc');
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchBooks=()=>{
            const booksRef=ref(db,'books');
            let bookQuery=query(booksRef,orderByChild('publicationDate'));

            if(sortOrder==='asc'){
                bookQuery=query(booksRef,orderByChild('publicationDate'))
            }else{
                bookQuery=query(booksRef,orderByChild('publicationDate'))
            }
            onValue(bookQuery,(snapshot)=>{
                const data=snapshot.val();
                const booksList=data?Object.keys(data).map(key=>({id:key,...data[key]})):[];
                setBooks(booksList);
            })
        }
        fetchBooks();
    },[search,sortOrder])
    if(!user){
        navigate('/Login');
        return null;
    }

    return(
        <Box p={5}>
            <input placeholder="Search By Title" value={search} onChange={(e)=>setSearch(e.target.value)} mb={4}/>
            <Button onClick={()=>setSortOrder(sortOrder==='desc'?'asc':'desc')}>Sort By Publication Date({sortOrder==='desc'?'New to Old':'Old to New'})</Button>
            <SimpleGrid columns={3} spacing={5} mt={4}>
                {books
                .filter(book=>book.title.toLowerCase().includes(search.toLowerCase()))
                .map(book=>(
                    <Card key={book.id} onClick={()=>navigate(`/books/${book.id}`)}>
                        <CardBody>
                            <Image src={book.cover} alt={book.title} />
                            <Text fontSize='lg' mt={2}>{book.title}</Text>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    )
}
export default Books