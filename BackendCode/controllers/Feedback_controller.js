// controllers/contactController.js
const Contact = require('../Models/Feedback_schema');

exports.submitContactForm = async (req, res) => {

  try {
    const { name, message, email } = req.body;
   
      let contact = await new Contact({
        name,
        message,
        email,
      });
      let savedContact = await contact.save();
      console.log(savedContact)
      console.log("Your response sent successfully");
      res.json({
        success: true,
        message: "Your response sent successfully",
      });
    
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

exports.getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.deleteContact = async (req, res) => {
    try {
      const contactId = req.params.id;
  
      // Find the contact by ID and delete it
      const deletedContact = await Contact.findByIdAndDelete(contactId);
  
      if (!deletedContact) {
        // If contact with given ID is not found, return 404 Not Found
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      // If contact is successfully deleted, return success response
      return res.json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
      // If any error occurs during the process, return 500 Internal Server Error
      console.log('Error occurred:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };