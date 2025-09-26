// ...existing code with only one block of logic, data, columns and component...

import React, { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { DataTable } from "../components/data-table";
import { Modal } from "../components/modal";
import { UserForm } from "../components/forms/user-form";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Trash2 } from "lucide-react";

export const initialUsersData = [
	{
		id: 1,
		name: "Ana García",
		email: "ana.garcia@company.com",
		role: "Project Manager",
		projects: ["E-commerce Platform", "Mobile App"],
		status: "Activo",
		joinDate: "2023-01-15",
	},
	{
		id: 2,
		name: "Carlos López",
		email: "carlos.lopez@company.com",
		role: "Frontend Developer",
		projects: ["Dashboard Analytics", "API Integration"],
		status: "Activo",
		joinDate: "2023-03-20",
	},
	{
		id: 3,
		name: "María Rodríguez",
		email: "maria.rodriguez@company.com",
		role: "UX Designer",
		projects: ["Mobile App Redesign"],
		status: "Activo",
		joinDate: "2023-02-10",
	},
	{
		id: 4,
		name: "David Chen",
		email: "david.chen@company.com",
		role: "Backend Developer",
		projects: ["E-commerce Platform", "API Integration", "Security Audit"],
		status: "Activo",
		joinDate: "2022-11-05",
	},
	{
		id: 5,
		name: "Laura Martín",
		email: "laura.martin@company.com",
		role: "DevOps Engineer",
		projects: ["Security Audit"],
		status: "Inactivo",
		joinDate: "2023-06-12",
	},
	{
		id: 6,
		name: "Roberto Silva",
		email: "roberto.silva@company.com",
		role: "QA Tester",
		projects: ["E-commerce Platform", "Dashboard Analytics"],
		status: "Activo",
		joinDate: "2023-04-18",
	},
];

function getRoleColor(role) {
	switch (role) {
		case "Project Manager":
			return "bg-chart-1 text-chart-1-foreground";
		case "Frontend Developer":
			return "bg-chart-2 text-chart-2-foreground";
		case "Backend Developer":
			return "bg-chart-3 text-chart-3-foreground";
		case "UX Designer":
			return "bg-chart-4 text-chart-4-foreground";
		case "DevOps Engineer":
			return "bg-chart-5 text-chart-5-foreground";
		case "QA Tester":
			return "bg-secondary text-secondary-foreground";
		default:
			return "bg-muted text-muted-foreground";
	}
}

function getStatusColor(status) {
	return status === "Activo"
		? "bg-chart-3 text-chart-3-foreground"
		: "bg-muted text-muted-foreground";
}

const columns = [
	{
		key: "name",
		label: "Usuario",
		render: (value, row) => (
			<div className="flex items-center space-x-3">
				<Avatar className="h-8 w-8">
					<AvatarFallback className="text-xs">
						{value
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-medium">{value}</div>
					<div className="text-sm text-muted-foreground">
						{row.email}
					</div>
				</div>
			</div>
		),
	},
	{
		key: "role",
		label: "Rol",
		sortable: true,
		render: (value) => <Badge className={getRoleColor(value)}>{value}</Badge>,
	},
	{
		key: "projects",
		label: "Proyectos Asignados",
		render: (value) => (
			<div className="space-y-1">
				{value.slice(0, 2).map((project, index) => (
					<Badge key={index} variant="outline" className="text-xs">
						{project}
					</Badge>
				))}
				{value.length > 2 && (
					<Badge variant="outline" className="text-xs">
						+{value.length - 2} más
					</Badge>
				)}
			</div>
		),
	},
	{
		key: "status",
		label: "Estado",
		sortable: true,
		render: (value) => <Badge className={getStatusColor(value)}>{value}</Badge>,
	},
	{
		key: "joinDate",
		label: "Fecha Ingreso",
		sortable: true,
	},
];

export default function UsersPage() {
	const [users, setUsers] = useState(initialUsersData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState(null);
	const [deleteConfirm, setDeleteConfirm] = useState(null);

	const handleAdd = () => {
		setEditingUser(null);
		setIsModalOpen(true);
	};

	const handleEdit = (user) => {
		setEditingUser(user);
		setIsModalOpen(true);
	};

	const handleDelete = (user) => {
		setDeleteConfirm(user);
	};

	const confirmDelete = () => {
		if (deleteConfirm) {
			setUsers(users.filter((u) => u.id !== deleteConfirm.id));
			setDeleteConfirm(null);
		}
	};

	const handleView = (user) => {
		console.log("Ver usuario:", user);
	};

	const handleSave = (data) => {
		if (editingUser) {
			setUsers(
				users.map((u) =>
					u.id === editingUser.id ? { ...u, ...data } : u
				)
			);
		} else {
			const newUser = {
				...data,
				id: Math.max(...users.map((u) => u.id)) + 1,
				joinDate: new Date().toISOString().split("T")[0],
			};
			setUsers([...users, newUser]);
		}
		setIsModalOpen(false);
		setEditingUser(null);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setEditingUser(null);
	};

	return (
		<div className="flex h-screen bg-background">
			<Sidebar />

			<main className="flex-1 md:ml-64 overflow-auto">
				<div className="p-6 md:p-8">
					<DataTable
						data={users}
						columns={columns}
						title="Gestión de Usuarios"
						searchPlaceholder="Buscar usuarios..."
						onAdd={handleAdd}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onView={handleView}
					/>
				</div>
			</main>

			<Modal isOpen={isModalOpen} onClose={handleCancel}>
				<UserForm
					user={editingUser}
					onSave={handleSave}
					onCancel={handleCancel}
				/>
			</Modal>

			<Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
				<div className="p-6 text-center">
					<Trash2 className="h-12 w-12 text-destructive mx-auto mb-4" />
					<h3 className="text-lg font-semibold mb-2">
						Confirmar Eliminación
					</h3>
					<p className="text-muted-foreground mb-6">
						¿Estás seguro de que deseas eliminar al usuario "
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