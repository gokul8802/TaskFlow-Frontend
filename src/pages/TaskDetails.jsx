import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask } from "../services/api";
import Loader from "../components/Loader";

const TaskDetails = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTask(id);
        setTask(data.task);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <Loader message="Loading task details..." />;

  if (error) {
    return (
      <main className="page-container">
        <div className="error-message">{error}</div>
        <Link to="/">Back to Dashboard</Link>
      </main>
    );
  }

  if (!task) return <p>Task not found.</p>;

  return (
    <main className="page-container">
      <Link to="/" className="back-link">← Back to Dashboard</Link>

      <article className="details-card">
        <span className={`status ${task.status}`}>{task.status}</span>

        <h1>{task.title}</h1>

        <p>{task.description || "No description provided."}</p>

        <div className="task-metadata">
          <p><strong>Task ID:</strong> {task.id}</p>
          <p><strong>Created:</strong> {task.created_at || "Not available"}</p>
          <p><strong>Last Updated:</strong> {task.updated_at || "Not available"}</p>
        </div>

        <Link to={`/tasks/${task.id}/edit`} className="primary-btn">
          Edit Task
        </Link>
      </article>
    </main>
  );
};

export default TaskDetails;