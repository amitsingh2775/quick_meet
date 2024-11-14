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

// exports.profile=async(req,res)=>{
//   try {
//     const instructorId = req.user.user.id;
//     const user=await User.findById(instructorId).select('-password')
//     console.log("user is ",user);
    
//     if(!user){
//       return res.status(401).json({message:"user not found",success:false})
//     }
//     return res.status(201).json({user,success:true})
//   } catch (error) {
//     return res.status(500).send('Server error');
//   }
// }



// Controller to fetch user account details
 exports.getAccountDetails = async (req, res) => {
  try {
    // Find user by ID from the request
    const user = await User.findById(req.user.user.id).select("-password"); // Assuming the user ID is stored in req.user.id

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare the account details response
    const accountDetails = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Add role-specific fields to the account details
    if (user.role === 'instructor') {
      accountDetails.experience = user.experience;
      accountDetails.badges = user.badges;
      accountDetails.rating = user.rating;
      accountDetails.bio = user.bio;
    } else if (user.role === 'student') {
      accountDetails.joinedWebinars = user.joinedWebinars;
      accountDetails.bio = user.bio;
    }

    // Send the account details as a response
    return res.status(200).json(accountDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

 exports.updateAccountDetails = async (req, res) => {
  try {
    const { name, experience, badges, rating, bio, joinedWebinars } = req.body;

    // Find user by ID from the request (assuming the user ID is set in req.user.id)
    const user = await User.findById(req.user.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    // Update role-specific fields
    if (user.role === 'instructor') {
      if (experience !== undefined) user.experience = experience;
      if (badges) user.badges = badges;
      if (rating !== undefined) user.rating = rating;
      if (bio) user.bio = bio;
    } else if (user.role === 'student') {
      if (joinedWebinars !== undefined) user.joinedWebinars = joinedWebinars;
      if (bio) user.bio = bio;
    }

    // Save the updated user to the database
    await user.save();

    // Send the updated user details as a response
    return res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};


