const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department');
const { protect, authorize } = require('../middleware/authmiddleware');

router.post('/', protect, authorize('admin'), departmentController.createDepartment);

router.put('/:id', protect, authorize('admin'), departmentController.updateDepartment);

router.delete('/:id', protect, authorize('admin'), departmentController.deleteDepartment);

router.get('/', protect, authorize('admin', 'doctor'), departmentController.getDepartments);

module.exports = router;
