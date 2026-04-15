const express = require('express');
const router = express.Router();

const Project = require('../models/ProjectModel');
const User = require('../models/user');
const Application = require('../models/Application');

const validateProject = require('../middleware/validateProject');
const isLoggedIn = require("../middleware/isLoggedIn");


//index+search route
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const { skills, branch } = req.query;

      let projects = await Project.find()
  .sort({ createdAt: -1 }) // 🔥 newest first
  .populate('createdBy');

        let filtered = projects;

      
        if (skills && skills.trim() !== "") {
            const skillArray = skills.split(",").map(s => s.trim().toLowerCase());

            filtered = filtered.filter(p =>
                p.skillsRequired?.some(ps =>
                    skillArray.some(s => ps.toLowerCase().includes(s))
                )
            );
        }

        
        if (branch && branch !== "" && branch !== "All") {
            filtered = filtered.filter(p =>
                p.createdBy && p.createdBy.branch === branch
            );
        }

   
        if (filtered.length === 0) {
            return res.render('projects/index', {
                projects,
                skills,
                branch,
                message: "No matching projects found. Showing all projects."
            });
        }

      
        res.render('projects/index', {
            projects: filtered,
            skills,
            branch,
            message: null
        });

    } catch (err) {
        console.log(err);
        res.send("Error loading projects");
    }
});


router.get('/new', isLoggedIn, (req, res) => {
    res.render('projects/new');
});



router.post('/', isLoggedIn, validateProject, async (req, res) => {
    try {
        const { title, description, skillsRequired, cost } = req.body;

        const newProject = new Project({
            title,
            description,
            skillsRequired: skillsRequired.split(',').map(s => s.trim()),
            cost: Math.max(0, Number(cost) || 0),
            createdBy: req.session.userId   // 🔥 LINK USER
        });

        await newProject.save();
      res.redirect('/users/my-projects');

    } catch (err) {
        console.log(err);
        res.send("Error creating project");
    }
});





router.get('/:id/edit', isLoggedIn, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project.createdBy.equals(req.session.userId)) {
            return res.send("Not authorized");
        }

        res.render('projects/edit', { project });

    } catch (err) {
        console.log(err);
        res.send("Error loading edit page");
    }
});


router.post('/:id', isLoggedIn, validateProject, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

      
        if (!project.createdBy.equals(req.session.userId)) {
            return res.send("You are not authorized to edit this project");
        }

        const { title, description, skillsRequired, cost } = req.body;

        await Project.findByIdAndUpdate(req.params.id, {
            title,
            description,
            skillsRequired: skillsRequired.split(',').map(s => s.trim()),
            cost: Math.max(0, Number(cost) || 0)
        });

        res.redirect(`/projects/${req.params.id}`);

    } catch (err) {
        console.log(err);
        res.send("Error updating project");
    }
});



router.post('/:id/delete', isLoggedIn, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        
        if (!project.createdBy.equals(req.session.userId)) {
            return res.send("Not authorized");
        }

        await Project.findByIdAndDelete(req.params.id);

        res.redirect('/projects');

    } catch (err) {
        console.log(err);
        res.send("Error deleting project");
    }
});



router.get("/:id", isLoggedIn, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate("createdBy");

     
        const myApp = await Application.findOne({
            project: req.params.id,
            applicant: req.session.userId
        });

        res.render("projects/show", { project, myApp });

    } catch (err) {
        console.log(err);
        res.send("Error loading project");
    }
});



router.post('/:id/apply', isLoggedIn, async (req, res) => {
    try {
        const userId = req.session.userId;
        const projectId = req.params.id;

        const project = await Project.findById(projectId);
        if (!project) return res.redirect("/projects");

       
        if (project.createdBy.toString() === userId.toString()) {
            return res.redirect(`/projects/${projectId}`);
        }

        
        let appData = await Application.findOne({
            project: projectId,
            applicant: userId
        });

       
        if (appData) {

            if (appData.status === "pending" || appData.status === "accepted") {
                return res.redirect(`/projects/${projectId}`);
            }

            if (appData.status === "rejected") {

                if (appData.attemptCount >= 3) {
                    return res.redirect(`/projects/${projectId}`);
                }

                appData.status = "pending";
                appData.attemptCount += 1;

                await appData.save();
                return res.redirect(`/projects/${projectId}`);
            }
        }

    
        await Application.create({
            project: projectId,
            applicant: userId,
            status: "pending",
            attemptCount: 1
        });

        res.redirect(`/projects/${projectId}`);

    } catch (err) {
        console.log(err);
        res.redirect(`/projects/${req.params.id}`);
    }
});
module.exports = router;