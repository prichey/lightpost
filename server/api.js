const express = require('express');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const shortid = require('shortid');

// normally I'd have a more robust directory structure, with services split out per model, but I figure this is fine for now
const utils = require('./utils');

const router = new express.Router();
const adapter = new FileAsync('db.json');

// get all employees
router.get('/employees', async (req, res) => {
  try {
    const db = await low(adapter);
    const employees = db.get('employees').value();

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// create new employee
router.post('/employees', async (req, res) => {
  try {
    const db = await low(adapter);

    if (!utils.hasAllRequiredFields(req.body)) {
      console.log(req.body);
      res
        .status(400)
        .send(
          `The following fields are missing: ${utils.getMissingFields(
            req.body
          )}`
        );
      return;
    }

    // naive attempt at only accepting valid fields in request
    const sanitizedBody = utils.getSanitizedBody(req.body);
    const newEmployee = { ...sanitizedBody, id: shortid.generate() };

    const postResponse = await db
      .get('employees')
      .push(newEmployee)
      .write();

    res.status(200).json(postResponse);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// update employee
router.patch('/employee/:id', async (req, res) => {
  try {
    const db = await low(adapter);

    const { id } = req.params;
    const employee = await db.get('employees').find({ id }); // chainable lowdb object

    if (!employee.value()) {
      res.status(400).json({
        error: 'Invalid ID'
      });
      return;
    }

    const sanitizedBody = utils.getSanitizedBody(req.body);
    const patchResponse = await employee.assign(sanitizedBody).write();

    res.status(200).json(patchResponse);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// remove employee
router.delete('/employee/:id', async (req, res) => {
  try {
    const db = await low(adapter);

    const { id } = req.params;

    const deleteResponse = await db
      .get('employees')
      .remove({ id })
      .write();

    res.status(200).json(deleteResponse);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
