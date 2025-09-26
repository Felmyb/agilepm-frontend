import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    progress: 75,
    status: "En Progreso",
    dueDate: "15 Dic 2024",
    team: 8,
    tasks: { completed: 24, total: 32 },
    priority: "Alta",
    budget: "€45,000",
  },
  {
    id: 2,
    name: "Mobile App Redesign",
    progress: 45,
    status: "En Progreso",
    dueDate: "28 Dic 2024",
    team: 5,
    tasks: { completed: 18, total: 40 },
    priority: "Media",
    budget: "€28,000",
  },
  {
    id: 3,
    name: "Dashboard Analytics",
    progress: 90,
    status: "Casi Completo",
    dueDate: "10 Dic 2024",
    team: 6,
    tasks: { completed: 27, total: 30 },
    priority: "Alta",
    budget: "€35,000",
  },
  {
    id: 4,
    name: "API Integration",
    progress: 20,
    status: "Iniciado",
    dueDate: "20 Ene 2025",
    team: 4,
    tasks: { completed: 5, total: 25 },
    priority: "Media",
    budget: "€22,000",
  },
  {
    id: 5,
    name: "Security Audit",
    progress: 10,
    status: "Planificado",
    dueDate: "15 Feb 2025",
    team: 3,
    tasks: { completed: 2, total: 20 },
    priority: "Crítica",
    budget: "€18,000",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Casi Completo":
      return "bg-chart-3 text-chart-3-foreground"
    case "En Progreso":
      return "bg-chart-1 text-chart-1-foreground"
    case "Iniciado":
      return "bg-chart-2 text-chart-2-foreground"
    case "Planificado":
      return "bg-chart-4 text-chart-4-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Crítica":
      return "bg-destructive text-destructive-foreground"
    case "Alta":
      return "bg-orange-500 text-white"
    case "Media":
      return "bg-chart-4 text-chart-4-foreground"
    case "Baja":
      return "bg-chart-2 text-chart-2-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function ProjectOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Resumen de Proyectos</CardTitle>
        <Button variant="outline" size="sm">
          Ver Todos
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="space-y-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{project.name}</h4>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              <span className="text-sm text-muted-foreground">Presupuesto: {project.budget}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progreso</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Tareas:</span> {project.tasks.completed}/{project.tasks.total}
              </div>
              <div>
                <span className="font-medium">Equipo:</span> {project.team} miembros
              </div>
              <div>
                <span className="font-medium">Fecha:</span> {project.dueDate}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
