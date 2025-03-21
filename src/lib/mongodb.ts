
import mongoose from 'mongoose';

// MongoDB connection string
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MongoDB URI. Please check your environment variables.');
}

// Connection function
export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is required. Set VITE_MONGODB_URI in your environment variables.');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

// Models
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: { type: String, required: false },
  created_at: { type: Date, default: Date.now }
});

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: false },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Create models if they don't exist
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

// For user authentication
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
