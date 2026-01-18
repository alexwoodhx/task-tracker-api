import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createTask,
  getTasksForProject,
  getTaskById,
  updateTask,
  deleteTask,
} from "./tasks.service.js";

export const create = asyncHandler(async (req, res) => {
  const task = await createTask(
    req.params.projectId,
    req.body,
    req.user
  );
  res.status(201).json(task);
});

export const list = asyncHandler(async (req, res) => {
  const tasks = await getTasksForProject(
    req.params.projectId,
    req.user
  );
  res.json(tasks);
});

export const getOne = asyncHandler(async (req, res) => {
  const task = await getTaskById(req.params.id, req.user);
  res.json(task);
});

export const update = asyncHandler(async (req, res) => {
  const task = await updateTask(
    req.params.id,
    req.user,
    req.body
  );
  res.json(task);
});

export const remove = asyncHandler(async (req, res) => {
  await deleteTask(req.params.id, req.user);
  res.status(204).send();
});
