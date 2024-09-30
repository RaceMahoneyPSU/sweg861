const express = require('express');
const FormEntry = require('../models/Form');
const router = express.Router();

router.post('/submit-form', async (req, res) => {
    console.log('Received form submission:', req.body);
    const { userId, firstName, lastName, age, street, country, phoneNumber, email, years, reason } = req.body;
    try {
        const newEntry = new FormEntry({
            userId,
            firstName,
            lastName,
            age,
            street,
            country,
            phoneNumber,
            email,
            years,
            reason,
        });

        await newEntry.save();
        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error saving form entry:', error);
        res.status(500).json({ message: 'Error submitting form', error: error.message });
    }
});

router.get('/forms', async (req, res) => {
    try {
        const forms = await FormEntry.find();
        res.json(forms);
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update-form/:userId', async (req, res) => {
    const { userId } = req.params;

    const updatedData = req.body;
    try {
        const updatedEntry = await FormEntry.findOneAndUpdate(
            { userId },
            updatedData,
            { new: true, runValidators: true });
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ mesasge: 'Application updated successfully', updatedEntry });
    } catch (error) {
        console.error('Error updating form entry:', error);
        res.status(500).json({ message: 'Error updating application', error: error.mesasge });
    }
});

router.get('/form/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const formData = await FormEntry.findOne({ userId });

        if (!formData) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json(formData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/delete-form/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedFormEntry = await FormEntry.findOneAndDelete({ userId });

        if (!deletedFormEntry) {
            return res.status(404).json({ message: 'Form entry not found' });
        }

        res.json({ message: 'Form entry successfully deleted', deletedEntry: deletedFormEntry });
    } catch (error) {
        console.error('Error deleting form entry:', error);
        res.status(500).json({ error: 'Failed to delete form entry' });
    }
});


module.exports = router;