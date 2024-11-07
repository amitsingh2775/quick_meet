const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path as needed

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    console.log("user is ",user);
    
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance
    user = new User({ name, email, password, role });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      path: '/',                
      secure: false,
      maxAge:24 * 60 * 60 * 1000
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      path: '/',                
      secure:true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Logout function to clear the cookie
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, msg: 'Logged out successfully' });
};

exports.profile=async(req,res)=>{
  try {
    const instructorId = req.user.user.id;
    const user=await User.findById(instructorId).select('-password')
    console.log("user is ",user);
    
    if(!user){
      return res.status(401).json({message:"user not found",success:false})
    }
    return res.status(201).json({user,success:true})
  } catch (error) {
    return res.status(500).send('Server error');
  }
}
