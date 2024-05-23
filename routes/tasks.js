const express = require("express");
const Task = require("../models/Task.js");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
    console.log("Solicitud POST recibida en /create");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was a problem trying to create a Task" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const task = await Task.findById(req.params.id);

    res.status(201).send(task);
    console.log("Solicitud GET recibida en /:id");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "There was a problem finding one task" });
  }
});

router.put("/markAsCompleted/:id", async (req, res) => {
  try {
    console.log(req.params);
    await Task.findByIdAndUpdate(req.params.id, {
      completed: true,
    });

    const task = await Task.findById(req.params.id);
    res.status(201).send(task);

    console.log("Solicitud PUT recibida en /markAsCompleted/:_id");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "There was a problem updating one task" });
  }
});

router.put("/id/:id", async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
    });

    const task = await Task.findById(req.params.id);
    res.status(201).send(task);

    console.log("Solicitud PUT recibida en /markAsCompleted/:_id");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "There was a problem updating one task" });
  }
});

router.delete("/id/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).send({ message: "Task deleted successfully", task });
    console.log(`Solicitud DELETE recibida en /id/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "There was a problem deleting the task" });
  }
});

router.get("/", async (req, res) => {
  try {
    console.log("Solicitud POST recibida en /create");
    const tasks = await Task.find();
    res.status(201).send(tasks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was a problem trying to list all Tasks" });
  }
});

module.exports = router;
