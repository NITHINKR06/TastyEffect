// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/Feedback_controller');

router.post('/submit', contactController.submitContactForm);
router.get('/all', contactController.getAllContacts);
router.delete('/delete/:id', contactController.deleteContact);

module.exports = router;
