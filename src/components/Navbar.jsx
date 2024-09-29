import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = React.memo(() => (
  <nav aria-label="Main navigation"> {/* Replaced header with nav for better semantic meaning */}
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#000',
        justifyContent: 'space-between',
        zIndex: 10, // Keeps the navbar above other elements
        px: { xs: 2, sm: 3, md: 5 }, // Responsive padding for different screen sizes
        height: { xs: '56px', sm: '64px' }, // Adjust height for better UX on smaller devices
        transition: 'height 0.3s ease', // Smooth height transition for responsiveness
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Home">
        <Typography
          variant="h5" // Adjust font size for better responsiveness
          sx={{
            color: 'lightgray',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            letterSpacing: 1.2,
            fontSize: { xs: '18px', sm: '24px' }, // Responsive typography size
            display: 'flex',
            alignItems: 'center',
          }}
        >
          VIDEO BOX
        </Typography>
      </Link>

      {/* Search Bar */}
      <SearchBar />
    </Stack>
  </nav>
));

export default Navbar;
