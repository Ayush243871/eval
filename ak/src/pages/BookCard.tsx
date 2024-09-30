import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';
import { Book } from '../types';

interface BookCardProps {
    book: Book;
    onBorrow: () => void;
    onReturn: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBorrow, onReturn }) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={book.cover} alt={book.title} />
            <Box p="5">
                <Text fontWeight="bold">{book.title}</Text>
                <Text>Author: {book.author}</Text>
                <Text>Genre: {book.genre}</Text>
                {book.isBorrowed ? (
                    <Button onClick={onReturn}>Return</Button>
                ) : (
                    <Button onClick={onBorrow}>Borrow</Button>
                )}
            </Box>
        </Box>
    );
};

export default BookCard;