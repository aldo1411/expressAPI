const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const students = require('../../Students');

// Get all students
router.get('/', (req, res) => res.json(students));

// Get single student
router.get('/:id', (req, res) => {
    // res.send(req.params.id);
    const exist = students.some(student => student.id === parseInt(req.params.id));

    if (exist) {
        res.json(students.filter(student => student.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No student with the id ${req.params.id}`});
    }
});

// Create new student
router.post('/', (req, res) => {
    const newStudent = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!req.body.name || !req.body.email) {
        return res.status(400).json( { msg: 'Please include name and email' });
    }

    students.push(newStudent);
    //res.json(students);
    res.redirect('/');
});

// Update student
router.put('/:id', (req, res) => {
    const exist = students.some(student => student.id === parseInt(req.params.id));

    if (exist) {
        const updStudent = req.body;
        students.forEach(student => {
            if (student.id === parseInt(req.params.id)) {
                student.name = updStudent.name ? updStudent.name : student.name;
                student.email = updStudent.email ? updStudent.email : student.email;

                res.json({ msg: 'Student updated', student });
            }
        });
    } else {
        res.status(400).json({ msg: `No student with the id ${req.params.id}`});
    }
});

// Delete student
router.delete('/:id', (req, res) => {
    const exist = students.some(student => student.id === parseInt(req.params.id));

    if (exist) {
        res.json( { msg: 'Student deleted', student: students.filter(student => student.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: `No student with the id ${req.params.id}`});
    }
});

module.exports = router;