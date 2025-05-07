import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getUserById = async (req, res) => {
  try {
      const id = req.user.id; 
      const user = await User.findById(id).select("-password");
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
    try {
        const id = req.user.id; // ID dari JWT
        const user = await User.findById(id).select("-password"); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



export const saveUser = async (req,res) => {
  try {
      const user = new User(req.body);
      const insertedUser = await user.save();
      res.status(201).json({
          id: insertedUser._id,
          fullName: insertedUser.fullName,
          email: insertedUser.email,
          role: insertedUser.role
          // exclude password
      });
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}


// Update user
export const updateUser = async (req, res) => {
  try {
    // Cari user berdasarkan ID
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validasi agar hanya user sendiri atau admin yang bisa update
    if (req.user.id !== user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized to update this profile" });
    }

    // Hash password jika ada perubahan
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true } // Mengembalikan data terbaru dan jalankan validasi
    );

    // Kirim data user yang diperbarui tanpa password
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phone,
        picture: updatedUser.picture,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteUser = async (req,res) => {
    
    try {
        const deleteUser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}