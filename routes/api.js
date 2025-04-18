const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/Skill');


router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects); // This returns the datat of project to Json
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills); //This returns the data of skills to Json
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;