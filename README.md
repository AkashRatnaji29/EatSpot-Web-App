EatSpot Web Application: Full-Stack Restaurant Finder

This project is a complete, full-stack web application designed as a modern restaurant listing and discovery service. It successfully implements all technical requirements and includes a secure user authentication system and clean UI/UX design.

🎯 Technical Requirements Met

The following technologies were used as mandated by the assignment:

Frontend Framework: React

Frontend Language: TypeScript (Mandatory)

Backend Runtime: Node.js (Express framework)

Database: MongoDB (Managed via Mongoose)

✨ Core Features & Architecture

Authentication: Full User Sign Up (bcrypt hashing) and Login (JWT) system.

Route Protection: The main restaurant listing page is protected, requiring users to log in before accessing content.

Discovery: Live Search (Name starts-with filter) and Cuisine Filtering.

Rich UI/UX: Modern, responsive design with Images, Ratings, and Router navigation.

⚙️ Setup and Installation Guide (Step-by-Step)

Please ensure you have Node.js (LTS) installed on your machine.

Step 1: Install Dependencies

Open your terminal in the project's root directory (eatspot-web-app).

Install Backend dependencies:

cd backend
npm install


Return to the root directory and install Frontend dependencies:

cd ..
cd frontend
npm install


(Return to the root directory for the next step.)

cd ..


Step 2: Database and Environment Configuration

Crucial Step: Create a file named .env inside the backend directory.

Add the following two variables to the .env file. You MUST replace the placeholders with your unique MongoDB and secret key values:

MONGO_URI=mongodb+srv://<YourUsername>:<YourPassword>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=YOUR_LONG_AND_COMPLEX_SECRET_KEY_HERE


Populate the Database: Run the seed script to create the database collection and populate it with initial restaurant data (Images and Ratings):

cd backend
npx ts-node seed.ts


Step 3: Running the Application

Start the Backend Server (must be running first):

npm start


The server will run on http://localhost:5000.

Open a new terminal window and start the Frontend Application:

cd frontend
npm run dev


The application will open in your browser on http://localhost:5173 (or similar port).
