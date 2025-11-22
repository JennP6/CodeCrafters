import logo from '../assets/CodeCraftersLogo.png';
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="CodeCrafters Logo" className="logo-image" />
      </div>

      <div className="nav-links">
        {user && (
          <>
            <span>Hello, {user.email}</span>
            <button onClick={() => { onLogout(), navigate('/login') }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
