import express from 'express';
import incidentCtrl from '../controllers/incident.controller.js';

const router = express.Router();

// Get All Incidents
router.get('/', incidentCtrl.getAllIncidents);

// Get Incident by Id
router.get('/:id', incidentCtrl.getIncidentById);

// Create a new Incident
router.post('/', incidentCtrl.createIncident);

// Update an existing Incident
router.put('/:id', incidentCtrl.updateIncident);

// Delete Incident by Id
router.delete('/:id', incidentCtrl.deleteIncidentById);

// Delete All Incidents
router.delete('/', incidentCtrl.deleteAllIncidents);

export default router;
