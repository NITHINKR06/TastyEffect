const varificationSchema = require('../Models/Varification_user');

exports.getAllResponse = async (req, res) => {
    try {
      const Resoponse = await varificationSchema.find();
      res.status(200).json(Resoponse);
    } catch (error) {
      console.error('Error getting recipes', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.addresponse = async (req, res) => {
    try {
      const { /* name, */ email} = req.body;
      let checkEmail = await varificationSchema.findOne({ email: email });
      if (checkEmail) {
        console.log("Email already response sent!");
        return res.json({ message: "Email already response sent" });
      } else {
        let newResponse = await new varificationSchema({
        //   name,
          email
        });
        let savedResponse = await newResponse.save();
        console.log("successfully");
        res.json({
          success: true,
          message: "successfully",
        });
      }
    } catch (err) {
      console.log("Error occurred" + err);
      res.json({ error: err });
    }
  };