import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTasks, deleteTask } from "../services/api";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      setTasks(Array.isArray(data.tasks) ? data.tasks : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await deleteTask(id);
      setTasks((previous) => previous.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader message="Loading your tasks..." />;

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>My Tasks</h1>
          <p>Manage your work and stay organized.</p>
        </div>

        <Link to="/tasks/new" className="primary-btn">
          + Create Task
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="task-summary">
        <div className="summary-card">
          <h3>{tasks.length}</h3>
          <p>Total Tasks</p>
        </div>

        <div className="summary-card">
          <h3>{tasks.filter((t) => t.status === "pending").length}</h3>
          <p>Pending</p>
        </div>

        <div className="summary-card">
          <h3>{tasks.filter((t) => t.status === "completed").length}</h3>
          <p>Completed</p>
        </div>
      </div>

      <section className="task-list">
        <h2>All Tasks</h2>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>Create your first task to get started.</p>
            <Link to="/tasks/new" className="primary-btn">
              Create Your First Task
            </Link>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <article className="task-card" key={task.id}>
                <div className="task-card-top">
                  <span className={`status ${task.status}`}>
                    {task.status}
                  </span>
                  <span>#{task.id}</span>
                </div>

                <h3>{task.title}</h3>
                <p>{task.description || "No description provided."}</p>

                <div className="task-actions">
                  <Link to={`/tasks/${task.id}`}>View</Link>
                  <Link to={`/tasks/${task.id}/edit`}>Edit</Link>
                  <button onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;