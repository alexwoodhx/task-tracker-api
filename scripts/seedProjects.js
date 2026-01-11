import mongoose from "mongoose";
import { env } from "../src/config/env.js";
import { connectDB } from "../src/config/db.js";
import User from "../src/modules/users/user.model.js";
import Project from "../src/modules/projects/project.model.js";

const seed = async () => {
  try {
    await connectDB();

    console.log("Seeding database...");

    // Clean existing data
    await User.deleteMany();
    await Project.deleteMany();

    // Create users
    const adminUser = await User.create({
      email: "admin@test.com",
      password: "password123",
      role: "admin",
    });

    const normalUser = await User.create({
      email: "user@test.com",
      password: "password123",
      role: "user",
    });

    console.log("Users created");

    // Create projects
    const projects = await Project.create([
      {
        name: "Admin Project 1",
        description: "Project owned by admin",
        owner: adminUser._id,
      },
      {
        name: "Admin Project 2",
        description: "Another admin project",
        owner: adminUser._id,
      },
      {
        name: "User Project 1",
        description: "Project owned by normal user",
        owner: normalUser._id,
      },
      {
        name: "User Project 2",
        description: "Second user project",
        owner: normalUser._id,
      },
    ]);

    console.log(`${projects.length} projects created`);

    console.log("Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed", err);
    process.exit(1);
  }
};

seed();
