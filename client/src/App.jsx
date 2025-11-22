import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Users from "./pages/Users.jsx";

import IncidentList from "./pages/IncidentList.jsx";
import CreateIncident from "./pages/CreateIncident.jsx";
import UpdateIncident from "./pages/UpdateIncident.jsx";

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
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/users" element={<Users />} />

        <Route path="/incidents" element={<IncidentList />} />
        <Route path="/incidents/create" element={<CreateIncident />} />
        <Route path="/incidents/:id/edit" element={<UpdateIncident />} />
      </Routes>
    </>
  );
}

export default App;
