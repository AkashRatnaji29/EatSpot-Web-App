import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About'; 
import { AuthProvider, useAuth } from './context/AuthContext.tsx'; // Ensure .tsx extension is used
import Login from './components/Login'; 
import Register from './components/Register'; 
import HomeContent from './components/HomeContent'; 
import ProtectedRoute from './components/ProtectedRoute.tsx';

// --- 1. Main Header Component (Handles Conditional Display) ---
const MainHeader = () => {
  const { isLoggedIn, username, logout } = useAuth(); // Access login status and functions

  return (
    <header className="site-header">
      <div className="logo">
        🍔 EatSpot
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link> 
        <Link to="/about">About</Link>
        
        {/* Conditional Navigation Links based on login status */}
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        ) : (
          <>
            <span className="welcome-user">Hello, {username}!</span>
            <button onClick={logout} className="logout-button">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

// --- 2. Main App Component (Wraps App in AuthProvider and Router) ---
function App() {
  return (
    <Router>
      <AuthProvider> {/* Provides login state to all child components */}
        <MainHeader />
        
        {/* Define the routes */}
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<HomeContent />} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;