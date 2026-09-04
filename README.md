# 🍜 LocalBite

> Discover amazing local food spots hiding around you.

LocalBite is a full-stack food discovery web application that helps users discover street food vendors, local stalls, home kitchens, and hidden food spots nearby.

Users can search for vendors, explore cuisines, find nearby places using their location, save favorites, and view detailed vendor information.

---

## ✨ Features

- 🔐 User registration and login
- 👋 Persistent user authentication
- 🔎 Search for food and vendors
- 🍴 Browse vendors by cuisine/category
- 📍 Use current location to find nearby vendors
- 📏 Filter vendors by distance
- ⭐ Sort vendors by rating
- 📍 Sort vendors by nearest distance
- ❤️ Add and remove favorite vendors
- 🏪 View detailed vendor information
- 🟢 Open/closed vendor status
- 🛵 Delivery availability
- 📱 Responsive design
- ⏳ Loading and error states
- ✨ Interactive UI animations
- 👁️ Password visibility toggle

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Vite

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MongoDB
- MongoDB Atlas

### Tools

- Git
- GitHub
- Postman
- VS Code

---

## 🏗️ Project Structure

```text
LocalBite/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── config/
│   ├── data/
│   ├── types/
│   └── utils/
│
├── server/
│   └── src/
│       ├── config/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── types/
│       ├── index.ts
│       └── seed.ts
│
├── public/
├── package.json
└── README.md
🚀 Getting Started
1. Clone the repository
git clone https://github.com/RamsaAnsari28/localbite.git
cd localbite

Replace YOUR-USERNAME with your GitHub username.

2. Install frontend dependencies
npm install
3. Install backend dependencies
cd server
npm install
4. Environment Variables

Create a .env file inside the server folder.

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Create the frontend .env file if required by the API configuration.

Never commit your .env files or expose your database credentials.

▶️ Running the Application
Start the Backend

From the server directory:

npm run dev

The backend will run on:

http://localhost:5000
Start the Frontend

From the project root:

npm run dev

The frontend will run on the Vite development server.

🔑 Authentication

LocalBite includes user authentication using:

User registration
Login
JWT authentication
Protected routes
Logout
Persistent login state
Password visibility controls
📍 Location & Discovery

LocalBite uses the browser's Geolocation API to determine the user's location.

The application calculates the distance between the user and vendors and allows filtering by:

Within 1 km
Within 3 km
Within 5 km
Within 10 km

Users can also sort vendors by:

Recommended
Highest rated
Nearest
❤️ Favorites

Users can save vendors to their favorites and access them from the Favorites page.

Favorites are persisted locally using browser localStorage, allowing them to remain available after refreshing the application.

🏪 Vendor Details

Each vendor has a dedicated details page displaying:

Vendor name
Cuisine
Rating
Price range
Open/closed status
Delivery availability
Vendor image
📸 Screenshots

Screenshots will be added after the final deployment.

🚀 Live Demo

Coming soon.

🔮 Future Improvements
🗺️ Interactive map integration
🛒 Food ordering
💳 Online payments
⭐ User reviews and ratings
🔔 Notifications
🏪 Vendor dashboard
📦 Order tracking
☁️ Production deployment
👩‍💻 Author

## 👩‍💻 Author

**Ramsha Ansari**

MCA Graduate | Web Developer

Interested in building modern and user-friendly web applications using React, TypeScript, Node.js, and MongoDB.

---

## 📄 License

This project is created for learning and portfolio purposes.
