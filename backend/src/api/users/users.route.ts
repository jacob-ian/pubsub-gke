import { Router } from "express";
import { UserController } from "./users.controller";

const users = Router();
const controller = new UserController();

users.get("/", async (req, res) => await controller.getUsers(req, res));
users.get("/:id", async (req, res) => await controller.getUserById(req, res));
users.post("/", async (req, res) => await controller.createUser(req, res));
users.put(
  "/:id",
  async (req, res) => await controller.updateUserById(req, res)
);
users.delete("/:id", async (req, res) => await controller.deleteUser(req, res));

export { users };
