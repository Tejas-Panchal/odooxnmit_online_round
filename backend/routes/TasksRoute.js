import express from 'express';
import auth from '../middleware/auth.js';
import Task from '../models/TasksModel.js';
import Project from '../models/ProjectsModel.js';

const router = express.Router();

// Middleware to check if user is a member of the project associated with the task
const checkProjectMembership = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        
        const project = await Project.findById(task.project);
        if (!project.teamMembers.includes(req.user.id)) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        
        req.task = task; // Pass task to the next handler
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/tasks/:id
// @desc    Get a single task by ID
// @access  Private
router.get('/:id', auth, checkProjectMembership, async (req, res) => {
    try {
        // req.task is passed from checkProjectMembership middleware
        await req.task.populate('assignee', 'name email');
        res.json(req.task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/tasks/:id
// @desc    Update a task (e.g., status, assignee)
// @access  Private
router.put('/:id', auth, checkProjectMembership, async (req, res) => {
    const { title, description, assignee, status, priority, deadline } = req.body;

    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (assignee) taskFields.assignee = assignee;
    if (status) taskFields.status = status;
    if (priority) taskFields.priority = priority;
    if (deadline) taskFields.deadline = deadline;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: taskFields },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, checkProjectMembership, async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;