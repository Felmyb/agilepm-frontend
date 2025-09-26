import { Sidebar } from "../components/sidebar";
import { DashboardStats } from "../components/dashboard-stats";
import { TaskStatusChart, UpcomingDeadlines } from "../components/dashboard/TaskStatusChart";
import axios from "axios";
import { useEffect, useState } from "react";

function DashboardPage() {
  // Estados para datos
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [tasksRes, projectsRes, usersRes] = await Promise.all([
          axios.get("/api/tasks"),
          axios.get("/api/projects"),
          axios.get("/api/users"),
        ]);
        setTasks(Array.isArray(tasksRes.data) ? tasksRes.data : []);
        setProjects(Array.isArray(projectsRes.data) ? projectsRes.data : []);
        setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      } catch (err) {
        console.error("Error al cargar datos del dashboard", err);
        setTasks([]);
        setProjects([]);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Métricas
  const usersCount = users.length;
  const tasksCount = tasks.length;
  const projectsCount = projects.length;
  const completedTasks = tasks.filter(t => t.status === "Completada").length;

  // Datos para el gráfico
  const statusCounts = [
    { estado: "Planificado", cantidad: tasks.filter(t => t.status === "Planificado").length },
    { estado: "En Progreso", cantidad: tasks.filter(t => t.status === "En Progreso").length },
    { estado: "Completado", cantidad: tasks.filter(t => t.status === "Completada").length },
    { estado: "Pausado", cantidad: tasks.filter(t => t.status === "Pausado").length },
  ];

  // Próximos deadlines (tareas próximas a vencer)
  const upcomingTasks = tasks
    .filter(t => t.dueDate && new Date(t.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const stats = [
    {
      title: "Proyectos Activos",
      value: projectsCount,
      icon: "FolderKanban",
      color: "text-chart-1",
    },
    {
      title: "Usuarios",
      value: usersCount,
      icon: "Users",
      color: "text-chart-2",
    },
    {
      title: "Tareas Completadas",
      value: completedTasks,
      icon: "CheckSquare",
      color: "text-chart-3",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-2"></span>
              <span className="text-muted-foreground">Cargando métricas...</span>
            </div>
          ) : (
            <>
              <DashboardStats stats={stats} />
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card rounded-lg p-4 shadow-md">
                  <TaskStatusChart data={statusCounts} />
                </div>
                <div className="bg-card rounded-lg p-4 shadow-md">
                  <UpcomingDeadlines tasks={upcomingTasks} />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
