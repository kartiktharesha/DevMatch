module.exports = (req, res, next) => {
    const { title, description, skillsRequired, cost } = req.body;

    let errors = [];

    if (!title || title.trim() === "") {
        errors.push("Title is required");
    }

    if (!description || description.trim() === "") {
        errors.push("Description is required");
    }

    if (!skillsRequired || skillsRequired.trim() === "") {
        errors.push("Skills are required");
    }

   if (cost === "" || cost === undefined) {
    req.body.cost = 0;
    }

    if (Number(cost) < 0) {
    errors.push("Cost must be 0 or more");
    }

    if (errors.length > 0) {
        return res.render("projects/new", {
            errors,
            project: req.body
        });
    }

    next();
};