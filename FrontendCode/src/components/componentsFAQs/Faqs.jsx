import FaqItem from './FaqItem'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './Faqs.css'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'


const Faqs = props => {
  const {faqsList} = props

  return (
    <div className="app-container">
      <div className="faqs-container">
      <Link to={'/'}>
        <Box color='success' sx={{borderRadius:'50%', height:50, width:30}}>
            <CloseIcon/>
        </Box>
      </Link>
        <h1 className="heading">FAQs</h1>
        <ul className="faqs-list">
          {faqsList.map(eachFaq => (
            <FaqItem key={eachFaq.id} faqDetails={eachFaq} />
            
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Faqs