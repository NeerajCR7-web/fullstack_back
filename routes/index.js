
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/Skill');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    const skills = await Skill.find();
    res.render('index', { projects, skills }); // renders the homepage
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;