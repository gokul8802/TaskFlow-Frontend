import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createTask, getTask, updateTask } from "../services/api";
import Loader from "../components/Loader";

const TaskForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;

    const fetchTask = async () => {
      try {
        const data = await getTask(id);
        setForm({
          title: data.task.title || "",
          description: data.task.description || "",
          status: data.task.status || "pending",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, isEditing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (form.title.trim().length > 100) {
      setError("Title cannot exceed 100 characters.");
      return;
    }

    if (!["pending", "in-progress", "completed"].includes(form.status)) {
      setError("Please select a valid status.");
      return;
    }

    try {
      setSubmitting(true);

      const taskData = {
        title: form.title.trim(),
        description: form.description.trim(),
        status: form.status,
      };

      if (isEditing) {
        await updateTask(id, taskData);
      } else {
        await createTask(taskData);
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader message="Loading task..." />;

  return (
    <main className="page-container">
      <Link to="/" className="back-link">← Back to Dashboard</Link>

      <form className="task-form" onSubmit={handleSubmit}>
        <h1>{isEditing ? "Edit Task" : "Create New Task"}</h1>
        <p>
          {isEditing
            ? "Update your task details."
            : "Add a new task to your workspace."}
        </p>

        {error && <div className="error-message">{error}</div>}

        <label>Task Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={form.title}
          onChange={handleChange}
          maxLength={100}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Describe your task..."
          value={form.description}
          onChange={handleChange}
          rows={5}
        />

        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit" disabled={submitting}>
          {submitting
            ? "Saving..."
            : isEditing
              ? "Update Task"
              : "Create Task"}
        </button>
      </form>
    </main>
  );
};

export default TaskForm;