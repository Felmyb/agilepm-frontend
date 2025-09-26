"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { User, Save, X } from "lucide-react"

interface UserFormProps {
  user?: any
  onSave: (data: any) => void
  onCancel: () => void
}

const availableProjects = [
  "E-commerce Platform",
  "Mobile App Redesign",
  "Dashboard Analytics",
  "API Integration",
  "Security Audit",
]

export function UserForm({ user, onSave, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    status: user?.status || "Activo",
    projects: user?.projects || [],
    phone: user?.phone || "",
    department: user?.department || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.role) {
      newErrors.role = "El rol es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleProjectChange = (project: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      projects: checked ? [...prev.projects, project] : prev.projects.filter((p: string) => p !== project),
    }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {user ? "Editar Usuario" : "Nuevo Usuario"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ej: Ana García"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="ana.garcia@company.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="user-role">Rol *</Label>
              <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                <SelectTrigger
                  id="user-role"
                  name="role"
                  aria-label="Rol"
                  className={errors.role ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Project Manager">Project Manager</SelectItem>
                  <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                  <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                  <SelectItem value="UX Designer">UX Designer</SelectItem>
                  <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                  <SelectItem value="QA Tester">QA Tester</SelectItem>
                  <SelectItem value="Product Owner">Product Owner</SelectItem>
                  <SelectItem value="Scrum Master">Scrum Master</SelectItem>
                </SelectContent>
              </Select>
              {/* Input oculto para autofill/accesibilidad */}
              <input type="hidden" id="user-role" name="role" value={formData.role} />
              {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger
                  id="user-status"
                  name="status"
                  aria-label="Estado"
                >
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                  <SelectItem value="Vacaciones">Vacaciones</SelectItem>
                  <SelectItem value="Licencia">Licencia</SelectItem>
                </SelectContent>
              </Select>
              {/* Input oculto para autofill/accesibilidad */}
              <input type="hidden" id="user-status" name="status" value={formData.status} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+34 600 000 000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-department">Departamento</Label>
              <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                <SelectTrigger
                  id="user-department"
                  name="department"
                  aria-label="Departamento"
                >
                  <SelectValue placeholder="Seleccionar departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                  <SelectItem value="Diseño">Diseño</SelectItem>
                  <SelectItem value="Producto">Producto</SelectItem>
                  <SelectItem value="QA">QA</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              {/* Input oculto para autofill/accesibilidad */}
              <input type="hidden" id="user-department" name="department" value={formData.department} />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor={availableProjects[0]}>Proyectos Asignados</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {availableProjects.map((project) => (
                <div key={project} className="flex items-center space-x-2">
                  <Checkbox
                    id={project}
                    name="projects"
                    value={project}
                    checked={formData.projects.includes(project)}
                    onCheckedChange={(checked: boolean) => handleProjectChange(project, checked)}
                  />
                  {/* Input nativo oculto para accesibilidad/autofill, con el mismo id que el label y el Checkbox */}
                  <input
                    type="checkbox"
                    id={project}
                    name="projects"
                    value={project}
                    checked={formData.projects.includes(project)}
                    onChange={e => handleProjectChange(project, e.target.checked)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <Label htmlFor={project} className="text-sm font-normal">
                    {project}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {user ? "Actualizar" : "Crear"} Usuario
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
