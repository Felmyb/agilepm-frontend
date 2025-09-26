import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
  {
    id: 1,
    user: "Ana García",
    action: "completó la tarea",
    target: "Implementar autenticación",
    project: "E-commerce App",
    time: "hace 2 horas",
    type: "completed",
  },
  {
    id: 2,
    user: "Carlos López",
    action: "creó un nuevo sprint",
    target: "Sprint 3 - UI Components",
    project: "Dashboard Admin",
    time: "hace 4 horas",
    type: "created",
  },
  {
    id: 3,
    user: "María Rodríguez",
    action: "asignó la tarea",
    target: "Diseño de wireframes",
    project: "Mobile App",
    time: "hace 6 horas",
    type: "assigned",
  },
  {
    id: 4,
    user: "David Chen",
    action: "comentó en",
    target: "Bug en el login",
    project: "E-commerce App",
    time: "hace 8 horas",
    type: "commented",
  },
  {
    id: 5,
    user: "Laura Martín",
    action: "actualizó el estado",
    target: "Pipeline CI/CD",
    project: "Security Audit",
    time: "hace 12 horas",
    type: "updated",
  },
  {
    id: 6,
    user: "Roberto Silva",
    action: "reportó un bug",
    target: "Error en formulario",
    project: "Dashboard Admin",
    time: "hace 1 día",
    type: "bug",
  },
  {
    id: 7,
    user: "Ana García",
    action: "finalizó el sprint",
    target: "Sprint 2 - Core Features",
    project: "E-commerce App",
    time: "hace 2 días",
    type: "completed",
  },
  {
    id: 8,
    user: "Carlos López",
    action: "creó el proyecto",
    target: "Nueva Landing Page",
    project: "Marketing Site",
    time: "hace 3 días",
    type: "created",
  },
]

const getActivityColor = (type: string) => {
  switch (type) {
    case "completed":
      return "bg-chart-3"
    case "created":
      return "bg-chart-1"
    case "assigned":
      return "bg-chart-2"
    case "commented":
      return "bg-chart-4"
    case "updated":
      return "bg-chart-5"
    case "bug":
      return "bg-destructive"
    default:
      return "bg-muted"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-muted-foreground">{activity.action}</span>
                    <span className="font-medium">{activity.target}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {activity.project}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
