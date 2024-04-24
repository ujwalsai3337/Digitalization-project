const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const student = require('./models/project.js');

mongoose.connect('mongodb+srv://keerthu:chellam2004@cluster0.cqttcna.mongodb.net/projects?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true // Add this line to avoid deprecation warning
});

app.post('/api/projects', async (req, res) => {
    try {
      let { project_name, Students, year, guides, amount, duration, Start_date, category, progress } = req.body;
      year = Math.floor(Math.random() * 4) + 1;
      console.log(Students);
      const newProject = new student({
        project_name,
        Students,
        year,
        guides,
        amount,
        duration,
        Start_date,
        category,
        progress
      });

      await newProject.save();
      
      // Respond with a success message
      res.status(201).json({ message: 'Project created successfully' });
      console.log(newProject);
      console.log("Insert successful")
    } catch (error) {
      // If an error occurs, respond with an error message
      console.error('Error saving project:', error);
      res.status(500).json({ error: 'Failed to save project' });
    }
});

app.get('/api/projects', async (req, res) => {
  try {
      // Fetch all projects from MongoDB
      const projects = await student.find();
      res.json(projects); // Return the projects as JSON response
  } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' }); // Respond with an error message
  }
});

app.get('/api/projectNames', async (req, res) => {
  try {
      // Fetch all project names from MongoDB
      const projects = await student.find({}, 'project_name');
      const projectNames = projects.map(project => project.project_name);
      res.json(projectNames); // Return project names as JSON response
  } catch (error) {
      console.error('Error fetching project names:', error);
      res.status(500).json({ error: 'Failed to fetch project names' }); // Respond with an error message
  }
});


// Route to get project by name
app.get('/api/projects/:projectName', async (req, res) => {
  try {
      const projectName = req.params.projectName;
      // Fetch project details from MongoDB based on project name
      const project = await student.findOne({ project_name: projectName });
      res.json(project); // Return project details as JSON response
  } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Failed to fetch project' }); // Respond with an error message
  }
});

// Define a new route for inserting progress
app.post('/api/progress', async (req, res) => {
  try {
      console.log(req.body);
      const { projectId, direction, resource_utilization, satisfaction, comments } = req.body;
      console.log(direction);
      console.log(satisfaction);
      // Find the project by ID
      const project = await student.findById(projectId);
      console.log(project);
      if (!project) {
          return res.status(404).json({ error: 'Project not found' });
      }

      // Push the new progress data into the progress array
      project.progress.push({ direction, resource_utilization, satisfaction, comments });

      // Save the updated project document
      await project.save();

      // Respond with a success message
      res.status(201).json({ message: 'Progress inserted successfully', project });
  } catch (error) {
      console.error('Error inserting progress:', error);
      res.status(500).json({ error: 'Failed to insert progress' });
  }
});

// Define a new route for updating guide and amount
app.put('/api/projects/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { guide, amount } = req.body;

    // Find the project by ID
    const project = await student.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update guide and amount
    if (guide) project.guides = guide;
    if (amount) project.amount = amount;

    // Save the updated project document
    await project.save();

    // Respond with the updated project
    res.json(project);
  } catch (error) {
    console.error('Error updating guide and amount:', error);
    res.status(500).json({ error: 'Failed to update guide and amount' });
  }
});



app.listen(3000, async () => {
  console.log("Server connected...");
});
