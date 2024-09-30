import React,{useContext} from "react";
import { AuthContext } from "../pages/AuthContext";
import { Link } from "react-router-dom";
import {Box,Button,Flex} from '@chakra-ui/react'

const Navbar=()=>{
    const {user}=useContext(AuthContext)

    return(
        <Flex as="nav" p={4} bg="blue.500" color="white" justify="space-between" align="center">
            <Box>
                <Link to="/books">Books</Link>
                <Link to="/register" ml={4}>Register</Link>
                <Link to="/login" ml={4}>Login</Link>
                {user && user.isAdmin && (
                    <Link to="/add-book" ml={4}>Add Book</Link>
                )}
            </Box>
            {user && (
                <Button onClick={()=>auth.signOut()} ml={4}>Logout</Button>
            )}
        </Flex>
    )
}
export default Navbar