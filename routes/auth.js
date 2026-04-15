const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


router.post("/login", async (req, res) => {
    try {
        console.log("BODY:", req.body);   // 👈 ADD

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        console.log("USER:", user);       // 👈 ADD

        if (!user) {
            return res.render("auth/login", {
                showNavbar: false,
                fullWidth: true,
                error: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("MATCH:", isMatch);   // 👈 ADD

        if (!isMatch) {
            return res.render("auth/login", {
                showNavbar: false,
                fullWidth: true,
                error: "Incorrect password"
            });
        }

        req.session.userId = user._id;

        res.redirect("/projects");

    } catch (err) {
        console.log("LOGIN ERROR:", err);   // 👈 IMPORTANT
        res.render("auth/login", {
            showNavbar: false,
            fullWidth: true,
            error: "Something went wrong"
        });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.render("auth/login", {
                showNavbar: false,
                fullWidth: true,
                error: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render("auth/login", {
                showNavbar: false,
                fullWidth: true,
                error: "Incorrect password"
            });
        }

       
        req.session.userId = user._id;

        const redirectUrl = req.session.redirectUrl || "/projects";
        delete req.session.redirectUrl;

        res.redirect(redirectUrl);

    } catch (err) {
        console.log(err);
        res.render("auth/login", {
            showNavbar: false,
            fullWidth: true,
            error: "Something went wrong"
        });
    }
});

//show signup and login pages
router.get("/signup", (req, res) => {
    res.render("auth/signup", {
        showNavbar: false,
        fullWidth: true,
        error: null
    });
});

router.get("/login", (req, res) => {
    res.render("auth/login", {
        showNavbar: false,
        fullWidth: true,
        error: null
    });
});
//logout route
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;