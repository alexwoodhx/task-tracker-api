import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createProject,
  getProjectsForUser,
  getProjectById,
  updateProject,
  deleteProject,
} from "./projects.service.js";

export const create = asyncHandler(async (req, res) => {
  const project = await createProject(req.body, req.user._id);
  res.status(201).json(project);
});

export const list = asyncHandler(async (req, res) => {
  const projects = await getProjectsForUser(req.user);
  res.json(projects);
});

export const getOne = asyncHandler(async (req, res) => {
  const project = await getProjectById(req.params.id, req.user);
  res.json(project);
});

export const update = asyncHandler(async (req, res) => {
  const project = await updateProject(
    req.params.id,
    req.user,
    req.body
  );
  res.json(project);
});

export const remove = asyncHandler(async (req, res) => {
  await deleteProject(req.params.id, req.user);
  res.status(204).send();
});
