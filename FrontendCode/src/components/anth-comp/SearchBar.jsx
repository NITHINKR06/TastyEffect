import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';


import './search.css';

import { useState } from 'react';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      
    },
  },
}));

const Stylecss = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(10),
  width: '3.5ch',
  // height:'4ch'
}));

export default function SearchAppBar() {

    React.useEffect(() => {
        const handleKeyPress = (event) => {
          // Check if Ctrl + K is pressed
          if (event.ctrlKey && event.key === 'l') {
            // Open the sBox modal
            setOpen(true);
          }
        };
      
        document.addEventListener('keydown', handleKeyPress);
      
        return () => {
          // Cleanup the event listener when the component is unmounted
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, []);
      

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'David', 'Eva', 'Frank'];

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    // Filter names based on input
    const filteredNames = names.filter(name => name.toLowerCase().includes(input.toLowerCase()));

    // Update suggestions
    setSuggestions(filteredNames);
  };
  
  return (
    <Box sx={{ flexGrow: 1 , ml: 20}} >
      <Toolbar>
            <Search onClick={handleOpen} className='search'>
                <SearchIconWrapper>
                    <SearchIcon />
                    <Stylecss>
                    <div style={{ borderRadius: '12px', background: "white", fontSize: '8px', height: '18px', alignItems: 'center',justifyContent:'center', textAlign:'center' , fontWeight: '800' }}>Ctrl + l</div>
                    </Stylecss>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    sx={{cursor:'none'}}
                    >
                </StyledInputBase>

        
            </Search>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='sBox'
                >
                <Box sx={style} >
                    <Input
                        type="text"
                        placeholder="Search for names"
                        value={searchTerm}
                        onChange={handleInputChange}
                    ></Input>
                    {suggestions.length > 0 && (
                        <ul>
                        {suggestions.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                        </ul>
                    )}
                </Box>
                </Modal>
      </Toolbar>
    </Box>
  );
}


