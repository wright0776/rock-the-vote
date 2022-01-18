const express = require("express");
const issuesRouter = express.Router();
const Issue = require("../models/issue");

issuesRouter.get("/", (req, res) => {
    Issue.find((err, issues) => {
        if (err) return res.status(500).send(err);
        return res.send(issues);
    });
});

issuesRouter.post("/", (req, res) => {
    const newIssue = new Issue(req.body);
    newIssue.save(err => {
        if (err) return res.status(500).send(err);
        return res.send(newIssue);
    });
});

issuesRouter.get("/:id", (req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err) return res.status(500).send(err);
        return res.send(issue);
    });
});

issuesRouter.put("/:id", (req, res) => {
    Issue.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedIssue) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedIssue);
    });
});

issuesRouter.delete("/:id", (req, res) => {
    Issue.findByIdAndRemove(req.params.id, (err, removedIssue) => {
        if (err) return res.status(500).send(err);
        return res.send(removedIssue);
    });
});

issuesRouter.put("/:id/add-comment", (req, res) => {
    Issue.findByIdAndUpdate(req.params.id, {$push: {comments: req.body}}, { new: true }, (err, updatedIssue) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedIssue.comments);
    });
});
module.exports = issuesRouter;