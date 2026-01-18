import Project from "./project.model.js";
import AppError from "../../utils/AppError.js";

export const createProject = async (data, userId) => {
    return Project.create({
        ...data,
        owner: userId,
    });
};

export const getProjectsForUser = async (user) => {
    const query = user.role === "admin" ? {} : { owner: user._id};

    return Project.find(query).sort({ createdAt: -1 });
};

export const getProjectById = async (projectId, user) => {
    const query = 
        user.role === "admin"
            ? { _id: projectId }
            : { _id: projectId, owner: user._id };

    const project = await Project.findOne(query);
    if (!project) throw new AppError("Project not found", 404);

    return project;
};

export const updateProject = async (projectId, user, updates) => {
    const query =
      user.role === "admin"
        ? { _id: projectId }
        : { _id: projectId, owner: user._id };
  
    const project = await Project.findOneAndUpdate(
      query,
      updates,
      { new: true, runValidators: true }
    );
  
    if (!project) throw new AppError("Project not found", 404);
  
    return project;
  };

  export const deleteProject = async (projectId, user) => {
    const query =
      user.role === "admin"
        ? { _id: projectId }
        : { _id: projectId, owner: user._id };
  
    const project = await Project.findOneAndDelete(query);
    if (!project) throw new AppError("Project not found", 404);
  };