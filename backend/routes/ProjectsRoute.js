import express from 'express';
import auth from '../middleware/auth.js';
import Project from '../models/ProjectsModel.js';
import User from '../models/UserModel.js';
import Task from '../models/TasksModel.js';
import Comment from '../models/CommentModel.js';

const router = express.Router();

// @route   POST api/projects
// @desc    Create a new project
// @access  Private
router.post('/', auth, async (req, res) => {
    const { name, description, deadline } = req.body;

    try {
        const newProject = new Project({
            name,
            description,
            deadline,
            projectManager: req.user.id, // The logged-in user is the project manager
            teamMembers: [req.user.id], // The creator is automatically a team member
        });

        const project = await newProject.save();
        res.status(201).json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects
// @desc    Get all projects for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // Find projects where the user is a team member
        const projects = await Project.find({ teamMembers: req.user.id }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects/:id
// @desc    Get a single project by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('teamMembers', 'name email');

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Ensure the user is a member of the project
        if (!project.teamMembers.some(member => member._id.toString() === req.user.id)) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/projects/:id
// @desc    Update a project (e.g., name, description, add/remove members)
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, description, deadline, teamMembers } = req.body;

    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Authorization: Only the project manager can update the project
        if (project.projectManager.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Build project object
        const projectFields = {};
        if (name) projectFields.name = name;
        if (description) projectFields.description = description;
        if (deadline) projectFields.deadline = deadline;
        if (teamMembers) projectFields.teamMembers = teamMembers;

        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: projectFields },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Authorization: Only the project manager can delete the project
        if (project.projectManager.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Optional: Cascade delete - remove all tasks associated with this project
        await Task.deleteMany({ project: req.params.id });

        await Project.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Project and associated tasks removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ... (keep all the existing project routes)

// @route   POST api/projects/:projectId/tasks
// @desc    Create a new task within a project
// @access  Private
router.post('/:projectId/tasks', auth, async (req, res) => {
    const { title, description, assignee, deadline, priority } = req.body;

    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Ensure the logged-in user is a member of the project
        if (!project.teamMembers.includes(req.user.id)) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const newTask = new Task({
            title,
            description,
            project: req.params.projectId,
            assignee,
            deadline,
            priority,
        });

        const task = await newTask.save();
        res.status(201).json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects/:projectId/tasks
// @desc    Get all tasks for a specific project
// @access  Private
router.get('/:projectId/tasks', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Ensure the logged-in user is a member of the project
        if (!project.teamMembers.includes(req.user.id)) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const tasks = await Task.find({ project: req.params.projectId }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ... (keep all the existing project and task routes)

// @route   PUT api/projects/:id/members/add
// @desc    Add a team member to a project
// @access  Private
router.put('/:id/members/add', auth, async (req, res) => {
    const { email } = req.body;

    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Authorization: Only the project manager can add members
        if (project.projectManager.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const userToAdd = await User.findOne({ email });
        if (!userToAdd) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if user is already a member
        if (project.teamMembers.includes(userToAdd.id)) {
            return res.status(400).json({ msg: 'User is already a member of this project' });
        }

        project.teamMembers.push(userToAdd.id);
        await project.save();
        
        // Return the updated project with populated team members
        const updatedProject = await Project.findById(req.params.id).populate('teamMembers', 'name email');
        res.json(updatedProject);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/projects/:id/members/remove
// @desc    Remove a team member from a project
// @access  Private
router.put('/:id/members/remove', auth, async (req, res) => {
    const { memberId } = req.body;

    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Authorization: Only the project manager can remove members
        if (project.projectManager.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Prevent project manager from being removed
        if (project.projectManager.toString() === memberId) {
            return res.status(400).json({ msg: 'Cannot remove the project manager' });
        }

        // Remove the member
        project.teamMembers = project.teamMembers.filter(
            (member) => member.toString() !== memberId
        );
        
        await project.save();

        // Return the updated project with populated team members
        const updatedProject = await Project.findById(req.params.id).populate('teamMembers', 'name email');
        res.json(updatedProject);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects/:projectId/comments
// @desc    Get all comments for a project
// @access  Private
router.get('/:projectId/comments', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project.teamMembers.includes(req.user.id)) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const comments = await Comment.find({ project: req.params.projectId })
            .populate('author', 'name email')
            .sort({ createdAt: 'asc' });
        
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/projects/:projectId/comments
// @desc    Post a new comment or reply
// @access  Private
router.post('/:projectId/comments', auth, async (req, res) => {
    const { content, parentComment } = req.body;

    try {
        const project = await Project.findById(req.params.projectId);
        if (!project.teamMembers.includes(req.user.id)) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const newComment = new Comment({
            content,
            parentComment: parentComment || null,
            project: req.params.projectId,
            author: req.user.id,
        });

        const savedComment = await newComment.save();
        // Populate author details before sending back
        const comment = await Comment.findById(savedComment._id).populate('author', 'name email');

        res.status(201).json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
