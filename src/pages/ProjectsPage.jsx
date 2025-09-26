export { initialProjectsData };
import { Sidebar } from "../components/sidebar";
import { DataTable } from "../components/data-table";
import { Modal } from "../components/modal";
import { ProjectForm } from "../components/forms/project-form";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Trash2 } from "lucide-react";

const initialProjectsData = [
	{
		id: 1,
		name: "E-commerce Platform",
		description:
			"Plataforma completa de comercio electrónico con carrito de compras y pagos",
		startDate: "2024-01-15",
		endDate: "2024-12-15",
		status: "En Progreso",
		progress: 75,
		team: 8,
		manager: "Ana García",
	},
	{
		id: 2,
		name: "Mobile App Redesign",
		description: "Rediseño completo de la aplicación móvil con nueva UX/UI",
		startDate: "2024-02-01",
		endDate: "2024-12-28",
		status: "En Progreso",
		progress: 45,
		team: 5,
		manager: "Carlos López",
	},
	{
		id: 3,
		name: "Dashboard Analytics",
		description: "Dashboard de análisis y métricas en tiempo real",
		startDate: "2024-01-10",
		endDate: "2024-12-10",
		status: "Casi Completo",
		progress: 90,
		team: 6,
		manager: "María Rodríguez",
	},
	{
		id: 4,
		name: "API Integration",
		description: "Integración con APIs externas y microservicios",
		startDate: "2024-03-01",
		endDate: "2025-01-20",
		status: "Iniciado",
		progress: 20,
		team: 4,
		manager: "David Chen",
	},
	{
		id: 5,
		name: "Security Audit",
		description:
			"Auditoría completa de seguridad y implementación de mejoras",
		startDate: "2024-04-01",
		endDate: "2024-11-30",
		status: "Planificado",
		progress: 5,
		team: 3,
		manager: "Laura Martín",
	},
];

const getStatusColor = (status) => {
	switch (status) {
		case "Casi Completo":
			return "bg-chart-3 text-chart-3-foreground";
		case "En Progreso":
			return "bg-chart-1 text-chart-1-foreground";
		case "Iniciado":
			return "bg-chart-2 text-chart-2-foreground";
		case "Planificado":
			return "bg-chart-4 text-chart-4-foreground";
		default:
			return "bg-muted text-muted-foreground";
	}
};

const columns = [
	{
		key: "name",
		label: "Nombre",
		sortable: true,
	},
	{
		key: "description",
		label: "Descripción",
		render: (value) => (
			<div className="max-w-xs truncate" title={value}>
				{value}
			</div>
		),
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
		render: (value) => (
			<Badge className={getStatusColor(value)}>{value}</Badge>
		),
	},
	{
		key: "progress",
		label: "Progreso",
		render: (value) => (
			<div className="w-20">
				<Progress value={value} className="h-2" />
				<span className="text-xs text-muted-foreground">{value}%</span>
			</div>
		),
	},
	{
		key: "manager",
		label: "Manager",
		sortable: true,
	},
];


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProjectsPage() {
	const [projects, setProjects] = useState(initialProjectsData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState(null);
	const [deleteConfirm, setDeleteConfirm] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();

	// Abrir modal si se navega desde el sidebar
	useEffect(() => {
		if (location.state && location.state.openNew) {
			setEditingProject(null);
			setIsModalOpen(true);
			// Limpiar el state para evitar abrirlo de nuevo al navegar
			navigate(location.pathname, { replace: true, state: {} });
		}
		// Escuchar evento personalizado para abrir modal
		const handler = () => {
			setEditingProject(null);
			setIsModalOpen(true);
		};
		window.addEventListener("open-new-project-modal", handler);
		return () => window.removeEventListener("open-new-project-modal", handler);
	}, [location, navigate]);

	const handleAdd = () => {
		setEditingProject(null);
		setIsModalOpen(true);
	};

	const handleEdit = (project) => {
		setEditingProject(project);
		setIsModalOpen(true);
	};

	const handleDelete = (project) => {
		setDeleteConfirm(project);
	};

	const confirmDelete = () => {
		if (deleteConfirm) {
			setProjects(projects.filter((p) => p.id !== deleteConfirm.id));
			setDeleteConfirm(null);
		}
	};

	const handleView = (project) => {
		console.log("Ver proyecto:", project);
		// Aquí se podría navegar a una página de detalles del proyecto
	};

	const handleSave = (data) => {
		if (editingProject) {
			setProjects(
				projects.map((p) =>
					p.id === editingProject.id ? { ...p, ...data } : p
				)
			);
		} else {
			const newProject = {
				...data,
				id: Math.max(...projects.map((p) => p.id)) + 1,
				progress: 0,
				team: 1,
			};
			setProjects([...projects, newProject]);
		}
		setIsModalOpen(false);
		setEditingProject(null);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setEditingProject(null);
	};

	return (
		<div className="flex h-screen bg-background">
			<Sidebar />

			<main className="flex-1 md:ml-64 overflow-auto">
				<div className="p-6 md:p-8">
					<DataTable
						data={projects}
						columns={columns}
						title="Gestión de Proyectos"
						searchPlaceholder="Buscar proyectos..."
						onAdd={handleAdd}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onView={handleView}
					/>
				</div>
			</main>

			{/* Modal para formulario */}
			<Modal isOpen={isModalOpen} onClose={handleCancel}>
				<ProjectForm
					project={editingProject}
					onSave={handleSave}
					onCancel={handleCancel}
				/>
			</Modal>

			{/* Modal de confirmación de eliminación */}
			<Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
				<div className="p-6 text-center">
					<Trash2 className="h-12 w-12 text-destructive mx-auto mb-4" />
					<h3 className="text-lg font-semibold mb-2">Confirmar Eliminación</h3>
					<p className="text-muted-foreground mb-6">
						¿Estás seguro de que deseas eliminar el proyecto "
						{deleteConfirm?.name}"? Esta acción no se puede deshacer.
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

