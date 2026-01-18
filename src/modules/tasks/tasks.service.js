import Task from "./task.model.js"
import Project from "../projects/project.model.js"

const getProjectForUser = async (projectId, user) => {
    const query = user.role === "admin" ? { _id: projectId } : { _id: projectId, owner: user._id };

    const project = await Project.findOne(query);
    if (!project) throw new Error("Project not found");

    return project;

}

export const createTask = async (projectId, data, user) => {
    await getProjectForUser(projectId, user);

    return Task.create({
        ...data,
        project: projectId,
    });
};

export const getTasksForProject = async (projectId, user) => {
    await getProjectForUser(projectId, user);
  
    return Task.find({ project: projectId }).sort({
      createdAt: -1,
    });
  };

export const getTaskById = async (taskId, user) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");
  
    await getProjectForUser(task.project, user);
    return task;
  };

export const updateTask = async (taskId, user, updates) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");
  
    await getProjectForUser(task.project, user);
  
    Object.assign(task, updates);
    await task.save();
  
    return task;
  };
  
export const deleteTask = async (taskId, user) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");
  
    await getProjectForUser(task.project, user);
    await task.deleteOne();
  };