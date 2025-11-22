import { useEffect, useState } from 'react';

const Dashboard = ({ user }) => {
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    dateOccured: '',
    dateReported: '',
    place: '',
    severity: 'Medium',
  });
  const [error, setError] = useState('');
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, reporterId: user.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error creating incident');
      setIncidents([...incidents, data]);
      setFormData({
        description: '',
        dateOccured: '',
        dateReported: '',
        place: '',
        severity: 'Medium',
      });
    } catch (err) {
      setError(err.message);
    }
  };

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
    <div className="dashboard">
      <h2>Welcome, {user.email}</h2>

      <form onSubmit={handleSubmit} className="form">
        <h3>Create Incident</h3>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOccured"
          value={formData.dateOccured}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateReported"
          value={formData.dateReported}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={formData.place}
          onChange={handleChange}
          required
        />
        <select name="severity" value={formData.severity} onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Incident</button>
      </form>

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
  );
};

export default Dashboard;
