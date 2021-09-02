import { Router } from "express";
import { User } from "./users.model";

const users = Router();

users.get("/", async (req, res) => {
  try {
    const users = await User.find({}).exec();
    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      error_message: "bad_request",
      error,
    });
  }
});

users.post("/", async (req, res) => {
  const body = req.body;
  try {
    const user = await new User(body).save();
    return res.status(201).json({
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(400).json({
      error_message: "bad_request",
      error: err,
    });
  }
});

users.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).exec();
    return res.status(200).json({
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error_message: "bad_request",
      error: error,
    });
  }
});

users.put("/:id", async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, update);
    return res.status(201).json({
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(400).json({
      error_message: "bad_request",
      error: err,
    });
  }
});

export { users };