import React from 'react'
import List from '@mui/material/List';
import { mainListItems, secondaryListItems } from '../listItems';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import { Drawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';




export default function Managerev() {
  return (
    <div>
      <Drawer variant="permanent" >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton >
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
            <Divider /> 
             
          <Divider /> 
          <Divider /> 
          <List component="nav" >
            {mainListItems}
            
            <Divider sx={{ my: 4 }} />
            {secondaryListItems}
            <secondaryListItems/>
          </List>
        </Drawer>
        <Divider /> 
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml:50}}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                  }}
                >
                
                </Paper>
              </Grid>
              
            </Grid>
          </Container>
    </div>
  )
}
