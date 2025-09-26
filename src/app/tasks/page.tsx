"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { TaskForm } from "@/components/forms/task-form"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

const initialTasksData = [
  {
    id: 1,
    title: "Implementar autenticación de usuarios",
    description: "Desarrollar sistema de login y registro con JWT",
    status: "Completada",
    priority: "Alta",
    assignedTo: "David Chen",
    project: "E-commerce Platform",
    sprint: "Sprint 2",
    dueDate: "2024-11-15",
    estimatedHours: 16,
  },
  {
    id: 2,
    title: "Diseñar wireframes de la app móvil",
    description: "Crear wireframes para todas las pantallas principales",
    status: "En Progreso",
    priority: "Media",
    assignedTo: "María Rodríguez",
    project: "Mobile App Redesign",
    sprint: "Sprint 1",
    dueDate: "2024-11-20",
    estimatedHours: 24,
  },
  {
    id: 3,
    title: "Configurar pipeline de CI/CD",
    description: "Implementar pipeline automatizado para deployment",
    status: "Pendiente",
    priority: "Alta",
    assignedTo: "Laura Martín",
    project: "Security Audit",
    sprint: "Sprint 3",
    dueDate: "2024-11-25",
    estimatedHours: 12,
  },
  {
    id: 4,
    title: "Optimizar consultas de base de datos",
    description: "Mejorar performance de queries más lentas",
    status: "En Progreso",
    priority: "Media",
    assignedTo: "Carlos López",
    project: "Dashboard Analytics",
    sprint: "Sprint 2",
    dueDate: "2024-11-18",
    estimatedHours: 8,
  },
  {
    id: 5,
    title: "Testing de integración API",
    description: "Crear tests automatizados para endpoints",
    status: "Pendiente",
    priority: "Baja",
    assignedTo: "Roberto Silva",
    project: "API Integration",
    sprint: "Sprint 1",
    dueDate: "2024-11-30",
    estimatedHours: 20,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completada":
      return "bg-chart-3 text-chart-3-foreground"
    case "En Progreso":
      return "bg-chart-1 text-chart-1-foreground"
    case "Pendiente":
      return "bg-chart-4 text-chart-4-foreground"
    case "Bloqueada":
      return "bg-destructive text-destructive-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Alta":
      return "bg-destructive text-destructive-foreground"
    case "Media":
      return "bg-chart-4 text-chart-4-foreground"
    case "Baja":
      return "bg-chart-2 text-chart-2-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const columns = [
  {
    key: "title",
    label: "Tarea",
    sortable: true,
    render: (value: string, row: any) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground max-w-xs truncate" title={row.description}>
          {row.description}
        </div>
      </div>
    ),
  },
  {
    key: "status",
    label: "Estado",
    sortable: true,
    render: (value: string) => <Badge className={getStatusColor(value)}>{value}</Badge>,
  },
  {
    key: "priority",
    label: "Prioridad",
    sortable: true,
    render: (value: string) => <Badge className={getPriorityColor(value)}>{value}</Badge>,
  },
  {
    key: "assignedTo",
    label: "Asignado a",
    render: (value: string) => (
      <div className="flex items-center space-x-2">
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-xs">
            {value
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
  {
    key: "project",
    label: "Proyecto",
    sortable: true,
    render: (value: string) => <Badge variant="outline">{value}</Badge>,
  },
  {
    key: "sprint",
    label: "Sprint",
    sortable: true,
  },
  {
    key: "dueDate",
    label: "Fecha Límite",
    sortable: true,
  },
  {
    key: "estimatedHours",
    label: "Horas Est.",
    sortable: true,
    render: (value: number) => `${value}h`,
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasksData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<any>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null)

  const handleAdd = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEdit = (task: any) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleDelete = (task: any) => {
    setDeleteConfirm(task)
  }

  const confirmDelete = () => {
    if (deleteConfirm) {
      setTasks(tasks.filter((t) => t.id !== deleteConfirm.id))
      setDeleteConfirm(null)
    }
  }

  const handleView = (task: any) => {
    console.log("Ver tarea:", task)
  }

  const handleSave = (data: any) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t)))
    } else {
      const newTask = {
        ...data,
        id: Math.max(...tasks.map((t) => t.id)) + 1,
      }
      setTasks([...tasks, newTask])
    }
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 md:p-8">
          <DataTable
            data={tasks}
            columns={columns}
            title="Gestión de Tareas"
            searchPlaceholder="Buscar tareas..."
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={handleCancel}>
        <TaskForm task={editingTask} onSave={handleSave} onCancel={handleCancel} />
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <div className="p-6 text-center">
          <Trash2 className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Confirmar Eliminación</h3>
          <p className="text-muted-foreground mb-6">
            ¿Estás seguro de que deseas eliminar la tarea "{deleteConfirm?.title}"? Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
