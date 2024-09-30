import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import { debounce } from 'lodash';

const SearchBar: React.FC<{ onSearch: (searchTerm: string) => void }> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearch = debounce((term: string) => {
        onSearch(term);
    }, 300);

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm]);

    return (
    
        <Input
            placeholder="Search for books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};

export default SearchBar;