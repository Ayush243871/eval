import React, { useCallback, useState } from 'react';
import { useBooks } from '../hooks/useBook';
import { Box, SimpleGrid, Text, Button } from '@chakra-ui/react';
import BookCard from '../pages/BookCard';
import SearchBar from './SearchBar';
import {User } from '../types'

const BookFeed: React.FC = () => {
    const { books, loading, borrowBook, returnBook, currentPage, setCurrentPage, totalPages } = useBooks();
    const [filteredBooks, setFilteredBooks] = useState(books);

    const handleSearch = useCallback((searchTerm: string) => {
        const filtered = books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredBooks(filtered);
    }, [books]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) return <Text>Loading...</Text>;

    return (
        <Box padding={5}>
            <SearchBar onSearch={handleSearch} />
            <SimpleGrid columns={[2, null, 3]} spacing="40px" marginTop="20px">
                {filteredBooks.map(book => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onBorrow={() => borrowBook(book.id, User.uid)}
                        onReturn={() => returnBook(book.id)}
                    />
                ))}
            </SimpleGrid>

            <Box marginTop={5}>
                <Text>Page {currentPage} of {totalPages}</Text>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default BookFeed;