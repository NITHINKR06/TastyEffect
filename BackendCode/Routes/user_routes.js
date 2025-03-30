const express = require("express");
const multer = require("multer");
const fetchAdmin = require("../Middleware/Admin");
const router = express.Router();
const {
  Login,
  InsertUsers,
  getAllUsers,
  updateUser,
  updatePassword,
  deleteUser,
  viewSingleUser,
  Verification,
  getAllEmails
} = require("../controllers/user_controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/User");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/verification", Verification);
router.get("/getAllEmail", getAllEmails);


router.post("/insertUser", upload.single("profile"), InsertUsers);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser/:id", upload.single("profile"), updateUser);
router.put("/password/:id", updatePassword);
router.delete("/deleteUser/:id", deleteUser);
router.get("/viewSingleUser/:id", viewSingleUser);
router.post("/login",  Login);

module.exports = router;
