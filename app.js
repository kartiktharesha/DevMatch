const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

// Models
const Application = require("./models/Application");
const Project = require("./models/ProjectModel");

// Routes
const projectRoutes = require("./routes/projects");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// ================= DATABASE CONNECTION =================

// 👉 Use Render env OR fallback to localhost
const DB_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/devmatch";

mongoose.connect(DB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// ================= MIDDLEWARE =================

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || "mysupersecret",
    resave: false,
    saveUninitialized: false
}));

// Auth middleware
const isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    next();
};

// Global variables
app.use((req, res, next) => {
    res.locals.currentUser = req.session.userId || null;
    res.locals.showNavbar = true;
    next();
});

// ================= VIEW ENGINE =================

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/boilerplate");

// ================= ROUTES =================

// Home
app.get("/", (req, res) => {
    res.render("home.ejs", { showNavbar: false, fullWidth: true });
});

// Auth
app.use("/", authRoutes);

// Users
app.use("/users", userRoutes);

// Projects
app.use("/projects", projectRoutes);

// ================= APPLY ROUTE =================

app.post("/apply/:projectId", isLoggedIn, async (req, res) => {
    try {
        const userId = req.session.userId;
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);
        if (!project) return res.redirect("/projects");

        if (project.createdBy.toString() === userId.toString()) {
            return res.redirect(`/projects/${projectId}`);
        }

        let appData = await Application.findOne({
            applicant: userId,
            project: projectId
        });

        if (appData) {
            if (appData.status === "pending" || appData.status === "accepted") {
                return res.redirect(`/projects/${projectId}`);
            }

            if (appData.attemptCount >= 3) {
                return res.redirect(`/projects/${projectId}`);
            }

            appData.status = "pending";
            appData.attemptCount += 1;
            await appData.save();

        } else {
            await Application.create({
                applicant: userId,
                project: projectId,
                status: "pending",
                attemptCount: 1
            });
        }

        res.redirect(`/projects/${projectId}`);

    } catch (err) {
        console.log(err);

        if (err.code === 11000) {
            return res.redirect(`/projects/${req.params.projectId}`);
        }

        res.send("Error applying");
    }
});

// ================= ACCEPT / REJECT =================

app.get("/accept/:id", isLoggedIn, async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate("project");

        if (!application || !application.project) {
            return res.redirect("/users/dashboard");
        }

        if (application.project.createdBy.toString() !== req.session.userId.toString()) {
            return res.redirect("/users/dashboard");
        }

        application.status = "accepted";
        await application.save();

        res.redirect("/users/dashboard");

    } catch (err) {
        console.log(err);
        res.redirect("/users/dashboard");
    }
});

app.get("/reject/:id", isLoggedIn, async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate("project");

        if (!application || !application.project) {
            return res.redirect("/users/dashboard");
        }

        if (application.project.createdBy.toString() !== req.session.userId.toString()) {
            return res.redirect("/users/dashboard");
        }

        application.status = "rejected";
        await application.save();

        res.redirect("/users/dashboard");

    } catch (err) {
        console.log(err);
        res.redirect("/users/dashboard");
    }
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

// ================= SERVER =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});