import React from 'react';
import Button from '@mui/material/Button';

const NavButton = ({ text, onClick, disabled }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: 'rgb(32, 35, 50)',
        color: '#FFF',
        fontWeight: '600',
        padding: '6px 12px',
        fontSize: '12px',
        borderRadius: '32px',
        marginLeft: 1,
        '&:hover': {
          backgroundColor: '#303652',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        '&:active': {
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
        },
        '&.Mui-disabled': {
          backgroundColor: '#555',
          opacity: 0.6,
          color: '#AAA',
        },
      }}
    >
      {text}
    </Button>
  );
};

export default NavButton;
