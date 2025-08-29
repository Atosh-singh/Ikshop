const express = require('express');
const router= express.Router();

const {createStaff} = require('@/controllers/StaffController/staffController');
const {createRight, updateRight,staffByRight} = require('@/controllers/StaffController/rightController');

// Route to create a new staff member
router.post('/', createStaff);

// Route to create a new right
router.post('/right', createRight);

// Route to update an existing right
router.put('/right/:id', updateRight);

// Route to fetch staff by right
router.get('/right/staff', staffByRight);


module.exports= router;