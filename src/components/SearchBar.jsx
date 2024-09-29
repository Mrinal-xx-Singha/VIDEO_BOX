import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      navigate(`/search/${trimmedTerm}`);
      setSearchTerm(''); // Clear the search input after submitting
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        pr: 2,
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        mr: { sm: 4, xs: 2 },
        width: { xs: '250px', sm: '400px' }, // Responsive width
        height: '40px', // Consistent height for better UX
      }}
    >
      <TextField
        variant="standard"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: '16px', // Improve font size for better readability
          },
        }}
        fullWidth
        aria-label="search field"
        inputProps={{
          style: { padding: '0 8px' }, // Add padding to improve text readability
        }}
      />
      <IconButton type="submit" sx={{ p: '5px', color: 'red' }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
