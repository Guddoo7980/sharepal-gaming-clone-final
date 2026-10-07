SharePal Gaming Rental Clone
A full-stack recreation of the SharePal Gaming Gadgets on Rent page.
Reference page:
https://sharepal.in/bangalore/gaming-gadgets-on-rent
This project is built to closely match the original SharePal experience while keeping the application dynamic and deployment-friendly.
Tech Stack
Frontend
- React
- Vite
- JavaScript
- CSS
- Responsive UI
Backend
- Node.js
- Express.js
- REST API
- JWT Authentication
Database
- MongoDB
- Mongoose
Deployment
- GitHub
- Vercel
Main Features
- Dynamic gaming product listing
- Products loaded through backend API
- Product data based on the supplied JSON file
- MongoDB support
- JSON fallback when MongoDB is not configured
- Dynamic search
- Category filtering
- Price sorting
- Rating/popularity sorting
- Rental date selection
- Dynamic rental-day calculation
- Dynamic rental-price calculation
- Product availability / out-of-stock handling
- Wishlist functionality
- Cart functionality
- Login
- Registration
- JWT-based authentication
- Responsive desktop/mobile layout
- FAQ section
- Testimonials
- SharePal-style footer
- Vercel-ready API configuration
Project Structure
sharepal-gaming-clone-final/
│
├── api/
│   └── index.js
│
├── server/
│   ├── data/
│   ├── models/
│   ├── routes/
│   └── ...
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── ...
│
├── public/
│
├── dist/
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vercel.json
├── vite.config.js
└── README.md
Prerequisites
Install the following before running the project:
- Node.js 18 or newer
- npm
- VS Code
- MongoDB Community Server OR MongoDB Atlas account
Check Node.js:
node -v
Check npm:
npm -v
Installation
1. Extract the ZIP
Extract:
sharepal-gaming-clone-final.zip
Open the extracted folder in VS Code.
2. Open VS Code Terminal
Use:
Terminal → New Terminal
Make sure the terminal path is inside the project root.
Example:
C:\Users\YourName\Downloads\sharepal-gaming-clone-final>
3. Install Dependencies
Run:
npm install
Environment Variables
Create a file named:
.env
in the project root.
Example:
PORT=5000
JWT_SECRET=sharepal_clone_secret_key
MONGODB_URI=mongodb://127.0.0.1:27017/sharepal_clone
For MongoDB Atlas:
PORT=5000
JWT_SECRET=your_secure_secret_key
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/sharepal_clone
Replace:
USERNAME
PASSWORD
YOUR_CLUSTER
with your MongoDB Atlas details.
Running the Project
Recommended Method
Run:
npm run dev
The project is configured to run in development mode.
Frontend normally runs on:
http://localhost:5173
Backend normally runs on:
http://localhost:5000
Testing the Backend
Open this URL in your browser:
http://localhost:5000/api/products
If the backend is working, you should see product data in JSON format.
Example:
[
  {
    "id": 1,
    "name": "Gaming Product",
    "rating": 4.8,
    "per_day_rent": 499
  }
]
Product API
Get all products
GET /api/products
Local URL:
http://localhost:5000/api/products
The frontend uses relative API calls such as:
/api/products
This is important for Vercel deployment.
Authentication
Demo Login
Use the following credentials for testing:
Email: demo@sharepalclone.com
Password: Demo@123
The login system uses JWT authentication.
MongoDB Product Setup
The project can work with either:
1. MongoDB database
2. Supplied JSON fallback
If MongoDB is not configured, product data can still be loaded from the included JSON source.
To seed products into MongoDB, configure your MONGODB_URI first.
Then run:
npm run seed
After seeding, restart the application:
npm run dev
Product Data
The supplied product JSON contains gaming rental products with fields such as:
id
name
image
rating
booked_count
tag
per_day_rent
out_of_stock
The application uses these fields dynamically.
Production Build
To create the production build:
npm run build
A successful build should show output similar to:
vite building for production...
modules transformed
built successfully
The production files are generated inside:
dist/
Preview Production Build
Run:
npm run preview
Vite will provide a local preview URL.
Important Development URLs
Frontend:
http://localhost:5173
Backend:
http://localhost:5000
Product API:
http://localhost:5000/api/products
GitHub Deployment
1. Create a Repository
Create a new GitHub repository.
Example:
sharepal-gaming-rental-clone
Do not initialize it with another README if this project already contains one.
2. Initialize Git
From the project folder:
git init
Add files:
git add .
Commit:
git commit -m "Initial SharePal gaming rental clone"
Set main branch:
git branch -M main
Add your GitHub repository:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
Push:
git push -u origin main
Important Files Not to Upload
Do not upload:
node_modules/
.env
These should already be handled by .gitignore.
Never upload your MongoDB password or JWT secret to GitHub.
Vercel Deployment
The project includes:
vercel.json
and a Vercel-compatible API entry point.
Steps
1. Push the project to GitHub.
2. Open https://vercel.com
3. Click Add New → Project
4. Import your GitHub repository.
5. Keep the project root as the root directory.
6. Add environment variables.
7. Deploy.
Vercel Environment Variables
Inside Vercel:
Project → Settings → Environment Variables
Add:
MONGODB_URI
JWT_SECRET
Example:
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secure_secret
Do not add localhost URLs in production.
API Calls on Vercel
The frontend should use:
/api/products
instead of:
http://localhost:5000/api/products
This allows the same code to work locally and on Vercel.
Common Problems
Products are not loading
First test:
http://localhost:5000/api/products
If nothing appears, check your backend terminal.
Also check:
MONGODB_URI=
If MongoDB is not available, verify the JSON fallback file exists.
Login is not working
Use:
demo@sharepalclone.com
Password:
Demo@123
Also check the backend terminal for authentication errors.
Port already in use
If port 5000 is already running, stop the previous Node process.
On Windows:
Ctrl + C
Then restart:
npm run dev
npm install error
Delete:
node_modules
package-lock.json
Then run:
npm install
Vite page is not opening
Run:
npm run dev
Then open:
http://localhost:5173
Production build test
Before uploading to GitHub/Vercel, run:
npm run build
The build must complete successfully.
Final Submission Checklist
Before submitting the assignment, verify:
- [ ] Website opens correctly
- [ ] Products load dynamically
- [ ] Search works
- [ ] Category filters work
- [ ] Sorting works
- [ ] Rental dates work
- [ ] Rental price updates dynamically
- [ ] Out-of-stock products are handled
- [ ] Login works
- [ ] Registration works
- [ ] MongoDB is connected
- [ ] Mobile layout works
- [ ] npm run build succeeds
- [ ] GitHub repository is public/accesssible
- [ ] Vercel live URL works
- [ ] .env is not committed
- [ ] README contains setup instructions
Submission Format
Submit:
GitHub Repository
https://github.com/YOUR_USERNAME/YOUR_REPOSITORY
Live Deployment
https://YOUR-PROJECT.vercel.app
Reference
Original SharePal page:
https://sharepal.in/bangalore/gaming-gadgets-on-rent
This project is created for educational / assessment purposes as a UI and full-stack recreation of the referenced page.
Author
Developed as a MERN-stack SharePal gaming rental page recreation.
