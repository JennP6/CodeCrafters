import logo from '../assets/CodeCraftersLogo.png';
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isUsersPage = location.pathname === "/users";
  const isLoginPage = location.pathname === "/login";

  const getInitials = () => {
    if (!user) return "";
    const first = user.firstName ? user.firstName[0] : "";
    const last = user.lastName ? user.lastName[0] : "";
    return (first + last).toUpperCase();
  };

  const handleLogoClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="CodeCrafters Logo" className="logo-image" />
      </div>

      <div className="nav-links">

        {/* Only show Users / Back to Login when NOT logged in */}
        {!user && (
          <>
            {isUsersPage ? (
              <button onClick={() => navigate('/login')}>
                Back to Login
              </button>
            ) : (
              <button onClick={() => navigate('/users')}>
                Users
              </button>
            )}
          </>
        )}

        {/* Avatar + Logout only when logged in AND not currently on login page */}
        {user && !isLoginPage && (
          <div className="nav-user-area">
            <div
              className="nav-avatar"
              title={`${user.firstName} ${user.lastName}`}
            >
              {getInitials()}
            </div>

            <button
              className="nav-logout-btn"
              onClick={() => {
                onLogout();
                navigate('/login');
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
