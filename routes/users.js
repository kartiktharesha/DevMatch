const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");

const Project = require("../models/Project");
const Application = require("../models/Application");
const User = require("../models/user");
const bcrypt = require("bcrypt");


router.get("/dashboard", isLoggedIn, async (req, res) => {
    try {
       
        const myProjects = await Project.find({
            createdBy: req.session.userId
        });

        const projectIds = myProjects.map(p => p._id);

        const applications = await Application.find({
            project: { $in: projectIds },
            status: "pending"
        })
        .populate("applicant")
        .populate("project");

      
        const validApplications = applications.filter(app => app.project !== null);

        const uniqueMap = new Map();

        validApplications.forEach(app => {
            const key = app.applicant._id.toString() + "_" + app.project._id.toString();

            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, app);
            }
        });

        const uniqueApplications = Array.from(uniqueMap.values())
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 6);

       
        const myApplicationsRaw = await Application.find({
            applicant: req.session.userId
        }).populate("project");

     
        const myApplications = myApplicationsRaw.filter(app => app.project !== null);

        res.render("users/dashboard", {
            applications: uniqueApplications,
            myApplications,
            layout: "layouts/dashboard"
        });

    } catch (err) {
        console.log(err);
        res.send("Error loading dashboard");
    }
});

router.get("/my-projects", isLoggedIn, async (req, res) => {
    try {
        const projects = await Project.find({
            createdBy: req.session.userId
        });

        res.render("users/my-projects", {
            projects,
            layout: "layouts/dashboard"
        });

    } catch (err) {
        console.log(err);
        res.send("Error loading projects");
    }
});


router.get("/applications", isLoggedIn, async (req, res) => {
    try {
        const applicationsRaw = await Application.find({
            applicant: req.session.userId
        })
        .populate({
            path: "project",
            populate: { path: "createdBy" }
        });

      
        const applications = applicationsRaw.filter(app => app.project !== null);

        const pending = applications.filter(a => a.status === "pending");
        const accepted = applications.filter(a => a.status === "accepted");
        const rejected = applications.filter(a => a.status === "rejected");

        res.render("users/applications", {
            pending,
            accepted,
            rejected,
            layout: "layouts/dashboard"
        });

    } catch (err) {
        console.log(err);
        res.send("Error loading applications");
    }
});


router.get("/students", isLoggedIn, async (req, res) => {
    try {
        const { skill, branch } = req.query;

        let filter = {
            _id: { $ne: req.session.userId },
            $or: [
                { isAvailable: true },
                { isAvailable: { $exists: false } }
            ]
        };

       
        if (branch && branch !== "All") {
            filter.branch = {
                $regex: new RegExp("^" + branch + "$", "i")
            };
        }

        
        let users = await User.find(filter)
            .sort({ _id: -1 });

     
        if (skill) {
            const skillArray = skill.split(",").map(s => s.trim().toLowerCase());

            users = users.filter(user =>
                user.skills?.some(us =>
                    skillArray.some(s => us.toLowerCase().includes(s))
                )
            );
        }

        res.render("users/students", {
            users,
            skill,
            branch,
            layout: "layouts/boilerplate",
            showSidebar: false
        });

    } catch (err) {
        console.log(err);
        res.send("Error loading students");
    }
});

router.get("/edit-profile", isLoggedIn, async (req, res) => {
    const user = await User.findById(req.session.userId);

    res.render("users/edit-profile", {
        user,
        layout: "layouts/dashboard"
    });
});

router.post("/edit-profile", isLoggedIn, async (req, res) => {
    try {
        const { name, username, password, skills, linkedin, isAvailable } = req.body;

        const updateData = {
            name,
            username,
            skills: skills ? skills.split(',').map(s => s.trim()) : [],
            linkedin,
            isAvailable: isAvailable === "on" // 🔥 SAVE AVAILABILITY
        };

        if (password && password.trim() !== "") {
            const hashed = await bcrypt.hash(password, 10);
            updateData.password = hashed;
        }

        await User.findByIdAndUpdate(req.session.userId, updateData);

        res.redirect("/users/profile");

    } catch (err) {
        console.log(err);
        res.send("Error updating profile");
    }
});


router.post("/delete", async (req, res) => {
    try {
        const userId = req.session.userId;

        const userProjects = await Project.find({ createdBy: userId });
        const projectIds = userProjects.map(p => p._id);

        await Application.deleteMany({ project: { $in: projectIds } });
        await Application.deleteMany({ applicant: userId });
        await Project.deleteMany({ createdBy: userId });
        await User.findByIdAndDelete(userId);

        req.session.destroy(() => {
            res.redirect("/");
        });

    } catch (err) {
        console.log(err);
        res.send("Error deleting account");
    }
});


router.get("/profile", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);

        res.render("users/profile", {
            user,
            layout: "layouts/dashboard"
        });

    } catch (err) {
        console.log(err);
        res.send("Error loading profile");
    }
});




module.exports = router;