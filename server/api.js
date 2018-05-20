const express = require('express');
const router = new express.Router();

const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');

const uuidv1 = require('uuid/v1'); // time-based

// get all employees
router.get('/employees', async (req, res) => {
  try {
    const db = await low(adapter);
    const employees = db.get('employees').value();

    res.json(employees);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// create new employee
router.post('/employees', async (req, res) => {
  try {
    const db = await low(adapter);

    if (!req.body.name) {
      res.status(400).send('Employee must have a name!');
      return;
    }

    const { name } = req.body; // only grab the things we need from the request
    const newEmployee = { name, id: uuidv1() };

    await db
      .get('employees')
      .push(newEmployee)
      .write();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// TODO: fill out PATCH and DELETE /employee/:id

module.exports = router;
