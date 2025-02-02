const express = require('express');
const mongoose = require('mongoose');

module.exports = (config) => {
  const router = express.Router();

const MONGO_URI = `mongodb://root:rootpassword@localhost:${config.SERVER_PORT}/gls-app?authSource=admin`;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define Opportunity Schema
const OpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  customerName: { type: String, required: true },
  opportunityType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  startDate: { type: Date },
  endDate: { type: Date },
});

// Create Opportunity Model
const Opportunity = mongoose.model('Opportunity', OpportunitySchema);

// Example route to get all opportunities
router.get('/opportunities', async (req, res) => {
  try {
    const sort = req.query.sort === 'asc' ? 1 : -1; // Default to descending order
    const opportunities = await Opportunity.find().sort({ createdAt: sort });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Example route to create a new opportunity
router.post('/opportunities', async (req, res) => {
  const opportunity = new Opportunity(req.body);
  try {
    const newOpportunity = await opportunity.save();
    res.status(201).json(newOpportunity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Route to update an existing opportunity
router.put('/opportunities/:id', async (req, res) => {
    try {
      const updatedOpportunity = await Opportunity.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedOpportunity) {
        return res.status(404).json({ message: 'Opportunity not found' });
      }
      res.json(updatedOpportunity);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Route to get a specific opportunity by ID
router.get('/opportunities/:id', async (req, res) => {
    try {
      const opportunity = await Opportunity.findById(req.params.id);
      if (!opportunity) {
        return res.status(404).json({ message: 'Opportunity not found' });
      }
      res.json(opportunity);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  return router;
}
