// routes/admin.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/Skill');

// Render the admin page
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    const skills = await Skill.find();
    res.render('admin', { projects, skills }); // Render the admin.pug template
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add Project
router.post('/add-project', async (req, res) => {
  const { title, description, imageUrl, projectUrl } = req.body;
  try {
    const newProject = new Project({ title, description, imageUrl, projectUrl });
    await newProject.save();
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add Skill
router.post('/add-skill', async (req, res) => {
  const { name, proficiency } = req.body;
  try {
    const newSkill = new Skill({ name, proficiency });
    await newSkill.save();
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete Project
router.post('/delete-project/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete Skill
router.post('/delete-skill/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;