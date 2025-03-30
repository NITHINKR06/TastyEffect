import React from 'react';
import "./ContactFormStyles.css";
import FAQs from './FAQs';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    // Handle form submission logic here
    event.preventDefault();
    console.log('Form submitted:', this.state);
    // Add logic to send form data to your backend or perform other actions
  };

  render() {
    return (
      <div className="contact-container">
        
        {/* <p>Have a question, suggestion, or just want to say hello? We'd love to hear from you! Use the form below to get in touch with us.</p> */}

        <form >
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>

          <label>
            Message:
            <textarea name="message" value={this.state.message} onChange={this.handleChange} />
          </label>

          <button type="submit">Submit</button>
        </form>
{/* 
        <div className="contact-info">
          <h2>Frequently Asked Questions (FAQs)</h2>
          <p>Before reaching out, be sure to check our FAQs page for answers to common questions.</p>
        </div>
        <Link to={'/FAQs'}>
          <Button variant='outlined'>
            View Faq Pages
          </Button>
        </Link><br/><br/> */}
        {/* <FAQs/> */}
        {/* <p className="thank-you">Thank you for visiting our recipe website. We look forward to hearing from you!</p> */}

        {/* <p>Tasty Effect </p> */}
      </div>
    );
  }
}

export default ContactPage;
