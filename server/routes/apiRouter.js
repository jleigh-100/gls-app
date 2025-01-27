
const express = require('express');
const router = express.Router();

router.get('/opportunities', (req, res) => {
    res.json([
        {
            id: 1,
            title: "Opportunity 1",
            description: "Description 1",
            status: 'Open',
            customerName: 'Customer 1',
            opportunityType: 'Open',
            createdAt: '2025-01-23',
            updatedAt: '2025-01-25',
            startDate: '2025-01-23',
        },
        {
            id: 2,
            title: "Opportunity 2",
            description: "Description 2",
            status: 'Open',
            customerName: 'Customer 2',
            opportunityType: 'Open',
            createdAt: '2025-01-23',
            updatedAt: '2025-01-25',
            startDate: '2025-01-23',
            endDate: '2025-01-25',
        },
    ]);
    // TODO: Link to database
});

router.post('/opportunities', (req, res) => { // add a new opportunity
    // write to DB
    const { id } = req.params;
    const data = req.body;
    console.log(`Saving new opportunity with id ${id}`);
    console.log(data);
    res.json({ message: 'Opportunity Saved' });
});

router.put('/opportunities/:id', (req, res) => { // update an opportunity
    // write to DB
    const { id } = req.params;
    const data = req.body;
    console.log(`Updating opportunity with id ${id}`);
    console.log(data);
    res.json({ message: 'Opportunity updated' });
});

module.exports = router;
