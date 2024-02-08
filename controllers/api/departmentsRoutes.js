const router = require('express').Router();
const { Department } = require('../../models');

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single department by ID
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) {
      res.status(404).json({ message: 'Department not found' });
      return;
    }
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new department
router.post('/', async (req, res) => {
  try {
    const newDepartment = await Department.create(req.body);
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a department
router.put('/:id', async (req, res) => {
  try {
    const updatedDepartment = await Department.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedDepartment[0] === 0) {
      res.status(404).json({ message: 'Department not found' });
      return;
    }
    res.status(200).json({ message: 'Department updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Delete department 
router.delete('/:id', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) {
      res.status(404).json({ message: 'Department not found' });
      return;
    }
    await Department.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
