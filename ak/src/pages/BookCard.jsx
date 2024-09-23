import React from "react";
import{Box,Text,Button}from '@chakra-ui/react'
import { Link } from "react-router-dom";

const BookCard=({book,onBorrow,onReturn})=>{
    return(
        <Box borderWidth="1px" borderRadius="lg" padding= "4"margin="4">
            <Text fontSize="xl">{book.title}</Text>
            <Text>Author:{book.author}</Text>
            
            <Text>Genre:{book.genre}</Text>
            <Link to={`/books/${book.id}`}>
            <Button colorScheme="teal" mt={2} >Show More</Button>
            </Link>
        </Box>
    )
}

export default BookCard