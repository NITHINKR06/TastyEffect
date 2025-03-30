const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Register, Login, GetAllAdmins } = require("../controllers/admin_controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Admin/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/register", upload.single("profile"), Register);
router.post("/login", Login);
router.get("/getAdminInfo", GetAllAdmins);

module.exports = router;
