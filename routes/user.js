const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//SignUp
router.post("/sign-in", async (req,res)=>{
    try {
    const {username} = req.body;
    const {email} = req.body;
    const existingUser = await User.findOne({username: username })
    const existingEmail = await User.findOne({email :email })
    if(existingUser){
        return res.status(400).json({message:"Username already exists"})
    }else if(username.length <4){
        return res.status(400).json({message:"Username Should have atleast 4 characters "})
    }
    if(existingEmail){
        return res.status(400).json({message:"Email already exists"})
    }
    const hashPass = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPass,
    });
    await newUser.save()
    return res.status(200).json({message:"Sigin Succesfull"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal server Error"});
    }
});

//Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: existingUser._id, username }, "tcmTM", { expiresIn: "2d" });
        res.status(200).json({ id: existingUser._id, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
})



module.exports = router;