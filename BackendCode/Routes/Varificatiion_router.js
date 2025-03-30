const express = require("express");
const router = express.Router();

const {
    getAllResponse, addresponse
  } = require("../controllers/varification_controller");

router.get('/response', getAllResponse);
router.post('/addresponse', addresponse);

module.exports = router;