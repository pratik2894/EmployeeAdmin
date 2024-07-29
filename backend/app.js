import express from 'express';
import cookieParser from 'cookie-parser';
import AdminRouter from './controllers/Admin.js';
import isAuthenticated from './middleware/Auth.js';
import EmployeeRouter from './controllers/Employee.js';
import cors from 'cors';

const app = express();

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and other credentials
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions)); // Enable CORS for all routes
  app.options('*', cors(corsOptions)); // Preflight requests handling

app.use(cookieParser());
app.use(express.json());

// Authentication middleware should be used after CORS and before route definitions if necessary

// Define the routes here
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/admin/employee', EmployeeRouter);

export default app;
