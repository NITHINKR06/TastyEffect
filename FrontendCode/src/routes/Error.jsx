import React from 'react'
import './errorstyle.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

import Man from '../assets/hero/vecteezy_ai-generated-disapproving-chef-character-isolated-on_36083623.png'

export default function Error() {
  return (
   <div className='full-cls'>
     <div className='main-box' style={{display:'flex' , justifyContent:'center' , alignItems:"center"}}>
        
        <div className='inner-box'>
          <h1 className='h1'>404 !</h1>
            <h4 className='h4'>Apologies, but the page you were looking for wasn't found.<br/> Try reaching for the below Button <br/> to Get back the connection</h4>
            <Link to={'/'}>
              <Button variant='contained' color='error' sx={{marginTop:'30px'}}> Back to home</Button>
            </Link>
        </div>
        <img src={Man} alt="image" style={{ marginTop:'100px', height:'650px'}} />
    </div>
   </div>
  )
}
