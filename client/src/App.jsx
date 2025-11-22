import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [activeForm, setActiveForm] = useState('login'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setActiveForm('login'); 
  };

  return (
    <>
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onSwitchForm={setActiveForm} 
      />
      {user ? (
        <Dashboard user={user} />
      ) : (
        <Home onLogin={setUser} activeForm={activeForm} />
      )}
    </>
  );
}

export default App;
