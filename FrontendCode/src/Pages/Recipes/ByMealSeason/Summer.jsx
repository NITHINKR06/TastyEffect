import React from 'react'
import Footer from '../../../components/Footer'
import Navbarhome from '../Navbar'
import { Box } from '@mui/material'
import { LiaGreaterThanSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';

export default function Summer() {
  return (
    <div> 
      <Navbarhome/>
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'left', height:'45px', width:'100%',backgroundColor:'red', paddingLeft:'250px'}}>
          <Link to={'/'}><h1>Tasty-Effect </h1></Link><LiaGreaterThanSolid />
          <Link to={'/allrecipe'}><h1>All Recipes</h1></Link><LiaGreaterThanSolid />
          <Link to={'/allrecipe/summer'}><h1>Summer</h1></Link><LiaGreaterThanSolid />
          <h1>name.item</h1>
        </Box>
      <Footer/>
    </div>
  )
}
