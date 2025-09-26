import React, { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { DataTable } from "../components/data-table";
import { Modal } from "../components/modal";
import { SprintForm } from "../components/forms/sprint-form";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Trash2 } from "lucide-react";

const initialSprintsData = [
  {
    id: 1,
    name: "Sprint 1 - Foundation",
    project: "E-commerce Platform",
    startDate: "2024-11-01",
    endDate: "2024-11-14",
    status: "Completado",
    progress: 100,
    totalTasks: 12,
    completedTasks: 12,
    teamVelocity: 45,
    goal: "Establecer arquitectura base y autenticación",
  },
  {
    id: 2,
    name: "Sprint 2 - Core Features",
    project: "E-commerce Platform",
    startDate: "2024-11-15",
    endDate: "2024-11-28",
    status: "En Progreso",
    progress: 65,
    totalTasks: 15,
    completedTasks: 10,
    teamVelocity: 38,
    goal: "Implementar carrito de compras y catálogo",
  },
  {
    id: 3,
    name: "Sprint 1 - Research & Design",
    project: "Mobile App Redesign",
    startDate: "2024-11-01",
    endDate: "2024-11-14",
    status: "Completado",
    progress: 100,
    totalTasks: 8,
    completedTasks: 8,
    teamVelocity: 32,
    goal: "Investigación de usuarios y wireframes",
  },
  {
    id: 4,
    name: "Sprint 2 - UI Components",
    project: "Mobile App Redesign",
    startDate: "2024-11-15",
    endDate: "2024-11-28",
    status: "En Progreso",
    progress: 40,
    totalTasks: 20,
    completedTasks: 8,
    teamVelocity: 28,
    goal: "Desarrollar componentes de interfaz",
  },
  {
    id: 5,
    name: "Sprint 1 - Analytics Setup",
    project: "Dashboard Analytics",
    startDate: "2024-11-08",
    endDate: "2024-11-21",
    status: "En Progreso",
    progress: 80,
    totalTasks: 10,
    completedTasks: 8,
    teamVelocity: 42,
    goal: "Configurar métricas y visualizaciones",
  },
  {
    id: 6,
    name: "Sprint 3 - Security Implementation",
    project: "Security Audit",
    startDate: "2024-11-22",
    endDate: "2024-12-05",
    status: "Planificado",
    progress: 0,
    totalTasks: 14,
    completedTasks: 0,
    teamVelocity: 0,
    goal: "Implementar mejoras de seguridad",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Completado":
      return "bg-chart-3 text-chart-3-foreground";
    case "En Progreso":
      return "bg-chart-1 text-chart-1-foreground";
    case "Planificado":
      return "bg-chart-4 text-chart-4-foreground";
    case "Retrasado":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const columns = [
  {
    key: "name",
    label: "Sprint",
    sortable: true,
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground">{row.goal}</div>
      </div>
    ),
  },
  {
    key: "project",
    label: "Proyecto",
    sortable: true,
    render: (value) => <Badge variant="outline">{value}</Badge>,
  },
  {
    key: "startDate",
    label: "Fecha Inicio",
    sortable: true,
  },
  {
    key: "endDate",
    label: "Fecha Fin",
    sortable: true,
  },
  {
    key: "status",
    label: "Estado",
    sortable: true,
    render: (value) => <Badge className={getStatusColor(value)}>{value}</Badge>,
  },
  {
    key: "progress",
    label: "Progreso",
    render: (value, row) => (
      <div className="w-24">
        <Progress value={value} className="h-2" />
        <div className="text-xs text-muted-foreground mt-1">
          {row.completedTasks}/{row.totalTasks} tareas
        </div>
      </div>
    ),
  },
  {
    key: "teamVelocity",
    label: "Velocidad",
    sortable: true,
    render: (value) => (
      <div className="text-center">
        <div className="font-medium">{value}</div>
        <div className="text-xs text-muted-foreground">puntos</div>
      </div>
    ),
  },
];

export default function SprintsPage() {
  const [sprints, setSprints] = useState(initialSprintsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSprint, setEditingSprint] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleAdd = () => {
    setEditingSprint(null);
    setIsModalOpen(true);
  };

  const handleEdit = (sprint) => {
    setEditingSprint(sprint);
    setIsModalOpen(true);
  };

  const handleDelete = (sprint) => {
    setDeleteConfirm(sprint);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setSprints(sprints.filter((s) => s.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  const handleView = (sprint) => {
    console.log("Ver sprint:", sprint);
  };

  const handleSave = (data) => {
    if (editingSprint) {
      setSprints(sprints.map((s) => (s.id === editingSprint.id ? { ...s, ...data } : s)));
    } else {
      const newSprint = {
        ...data,
        id: Math.max(...sprints.map((s) => s.id)) + 1,
        progress: 0,
        totalTasks: 0,
        completedTasks: 0,
      };
      setSprints([...sprints, newSprint]);
    }
    setIsModalOpen(false);
    setEditingSprint(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingSprint(null);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 md:p-8">
          <DataTable
            data={sprints}
            columns={columns}
            title="Gestión de Sprints"
            searchPlaceholder="Buscar sprints..."
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={handleCancel}>
        <SprintForm sprint={editingSprint} onSave={handleSave} onCancel={handleCancel} />
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <div className="p-6 text-center">
          <Trash2 className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Confirmar Eliminación</h3>
          <p className="text-muted-foreground mb-6">
            ¿Estás seguro de que deseas eliminar el sprint "{deleteConfirm?.name}"? Esta acción no se puede deshacer.
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
  );
}