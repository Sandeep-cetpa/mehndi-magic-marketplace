
# Mehndi & Nail Backend API Project

This document outlines the structure for the separate backend project that will provide API services for the Mehndi & Nail frontend application.

## Project Setup Instructions

1. Create a new folder for the backend project:
```
mkdir mehndi-nail-backend
cd mehndi-nail-backend
```

2. Initialize the project:
```
npm init -y
```

3. Install dependencies:
```
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
npm install -D typescript ts-node @types/express @types/mongoose @types/bcryptjs @types/jsonwebtoken @types/cors nodemon
```

4. Create a TypeScript configuration file (tsconfig.json) in the project root:
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

5. Create the project structure:

## Project Structure

```
mehndi-nail-backend/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── leadController.ts
│   │   └── productController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── models/
│   │   ├── Lead.ts
│   │   ├── Product.ts
│   │   └── User.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── leads.ts
│   │   └── products.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── lead.ts
│   │   └── product.ts
│   ├── utils/
│   │   └── generateToken.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

6. Create a `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

7. Update package.json scripts:
```json
"scripts": {
  "start": "node dist/server.js",
  "dev": "nodemon src/server.ts",
  "build": "tsc -p ."
}
```

## Implementation Details

### 1. Database Connection (`src/config/db.ts`)

```typescript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

### 2. Server Setup (`src/server.ts`)

```typescript
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import productRoutes from './routes/products';
import leadRoutes from './routes/leads';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
```

### 3. Models

For each model (User, Product, Lead), create corresponding files in the models directory.

### 4. Controllers & Routes

Implement the controllers and routes for each entity (products, leads, auth).

### 5. Middleware

Implement authentication middleware and error handling.

## Integration with Frontend

1. In the frontend project, set the environment variable:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

2. Use the apiService.ts from the frontend project to communicate with this backend.

## Running Both Projects

To run both the frontend and backend together:

1. Start the backend server:
```
cd mehndi-nail-backend
npm run dev
```

2. In a separate terminal, start the frontend:
```
cd mehndi-nail-frontend
npm run dev
```

3. The frontend will communicate with the backend through the API service.
