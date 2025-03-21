
import { connectToDatabase, User } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
  };
};

// Basic admin user creation (for demo purposes)
export async function createAdminUser(email: string, password: string) {
  try {
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return {
        success: false,
        message: "User already exists"
      };
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword
    });
    
    const savedUser = await newUser.save();
    
    return {
      success: true,
      message: "Admin user created successfully",
      user: {
        id: savedUser._id.toString(),
        email: savedUser.email
      }
    };
  } catch (error) {
    console.error("Error creating admin user:", error);
    return {
      success: false,
      message: "Error creating admin user"
    };
  }
}

export async function loginUser({ email, password }: LoginCredentials): Promise<AuthResponse> {
  try {
    await connectToDatabase();
    
    // Find user by email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return {
        success: false,
        message: "Invalid credentials"
      };
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid credentials"
      };
    }
    
    // Return user info
    return {
      success: true,
      message: "Login successful",
      user: {
        id: user._id.toString(),
        email: user.email
      }
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "Login error"
    };
  }
}
