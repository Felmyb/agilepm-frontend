import { Sidebar } from "@/components/sidebar"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { ProjectOverview } from "@/components/project-overview"

export default function Dashboard() {
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
          {/* <DashboardStats /> Eliminado para evitar duplicado */}

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
