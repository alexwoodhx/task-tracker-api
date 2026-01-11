import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String, maxlength: 5000 },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
  dueDate: { type: Date },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
