import logo from '../assets/CodeCraftersLogo.png';

const Navbar = ({ user, onLogout, onSwitchForm }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="CodeCrafters Logo" className="logo-image" />
      </div>

      <div className="nav-links">
        {!user && (
          <>
            <button onClick={() => onSwitchForm('login')}>Login</button>
            <button onClick={() => onSwitchForm('register')}>Register</button>
          </>
        )}

        {user && (
          <>
            <span>Hello, {user.email}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
