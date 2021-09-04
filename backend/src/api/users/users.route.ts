import { Router } from "express";
import { UserController } from "./users.controller";

const users = Router();
const controller = new UserController();

users.get("/", controller.getUsers);
users.get("/:id", controller.getUserById);
users.post("/", controller.createUser);
users.put("/:id", controller.updateUserById);
users.delete("/:id", controller.deleteUser);

export { users };
