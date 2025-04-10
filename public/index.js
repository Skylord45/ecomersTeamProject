import express from 'express';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import vendorRoutes from './routes/vendor.routes.js';
import authRoutes from './routes/auth.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';    
import cookieParser from "cookie-parser";

import 'dotenv/config';
export const app = express();
app.use(cookieParser())

// Now we can use images by giving path name like:- 'images/image_Name';
// Now we can use css by giving path name like:- 'css/file_Name';
// Now we can use javascript by giving path name like:- 'javascript/file_Name';
app.use(express.static('public'));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//All the User Routes
app.use('/', userRoutes);

//All the Admin Routes
app.use('/admin', adminRoutes);

//All the Vendor Routes
app.use('/vendor', vendorRoutes);

//All the Auth Routes
app.use('/auth', authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});


