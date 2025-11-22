import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export function CreateIncident({ user }) {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [incidents, setIncidents] = useState([]);
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        description: '',
        dateOccured: '',
        dateReported: '',
        place: '',
        severity: 'Medium',
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    formData.dateReported = new Date().toISOString().split("T")[0];
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
      if (!res.ok) {
        throw new Error(data.message || 'Error creating incident')
      }
      setIncidents([...incidents, data]);
      setSuccess('Congratulations! Incident Creation Success!');
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

  return (
    <div className="createIncident">
      <h2>Welcome, {user?.email}</h2>

      <form onSubmit={handleSubmit} className="form">
        <h3>Create Incident</h3>
        <label>Enter Incident Description</label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label>Enter Incident Date</label>
        <input
          type="date"
          name="dateOccured"
          value={formData.dateOccured}
          onChange={handleChange}
          required
        />
        <label>Enter Incident Place</label>
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={formData.place}
          onChange={handleChange}
          required
        />
        
        <label>Enter Incident Severity</label>
        <select name="severity" value={formData.severity} onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button className="createIncidentBtn" type="submit">Create Incident</button>
        <button className="back-to-dashboardBtn" type="submit" onClick={() => navigate('/dashboard')}>Back To Dashboard</button>
      </form>
    </div>
  )
}

export default CreateIncident;