
import { Sidebar } from "@/components/sidebar"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { ProjectOverview } from "@/components/project-overview"
import { useEffect, useState } from "react"
import api from "@/lib/api"

export default function Dashboard() {
  const [stats, setStats] = useState([
    { title: "Proyectos Activos", value: 0 },
    { title: "Usuarios", value: 0 },
    { title: "Tareas Completadas", value: 0 },
  ])

  useEffect(() => {
    async function fetchStats() {
      try {
        // Cambia las rutas según tu API real
        const [projectsRes, usersRes, tasksRes] = await Promise.all([
          api.get("/projects/count"),
          api.get("/users/count"),
          api.get("/tasks/completed/count"),
        ])
        setStats([
          { title: "Proyectos Activos", value: projectsRes.data.count },
          { title: "Usuarios", value: usersRes.data.count },
          { title: "Tareas Completadas", value: tasksRes.data.count },
        ])
      } catch (err) {
        // Si hay error, mantener los valores en 0
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance">Dashboard de Gestión Ágil</h1>
            <p className="text-muted-foreground mt-2">Resumen general de tus proyectos, equipos y progreso</p>
          </div>

          {/* Stats Cards */}
          <DashboardStats stats={stats} />

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ProjectOverview />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}
