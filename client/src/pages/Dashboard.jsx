import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const token = localStorage.getItem('token');

  const fetchIncidents = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/incidents', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setIncidents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/incidents/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error deleting incident');
      setIncidents(incidents.filter((i) => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {user && (
        <div className="dashboard">
          <h2>Welcome, {user.email}</h2>

          <button onClick={() => navigate('/incidents/create')}>Create New Incident</button>

          <h3>All Incidents</h3>
          <table className="incident-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date Occured</th>
                <th>Date Reported</th>
                <th>Place</th>
                <th>Severity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc._id}>
                  <td>{inc.description}</td>
                  <td>{new Date(inc.dateOccured).toLocaleDateString()}</td>
                  <td>{new Date(inc.dateReported).toLocaleDateString()}</td>
                  <td>{inc.place}</td>
                  <td>{inc.severity}</td>
                  <td>
                    <button onClick={() => handleDelete(inc._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
    
  );
};

export default Dashboard;
