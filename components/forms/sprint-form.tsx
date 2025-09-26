"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Save, X } from "lucide-react"

interface SprintFormProps {
  sprint?: any
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

export function SprintForm({ sprint, onSave, onCancel }: SprintFormProps) {
  const [formData, setFormData] = useState({
    name: sprint?.name || "",
    project: sprint?.project || "",
    startDate: sprint?.startDate || "",
    endDate: sprint?.endDate || "",
    goal: sprint?.goal || "",
    status: sprint?.status || "Planificado",
    capacity: sprint?.capacity || "",
    teamVelocity: sprint?.teamVelocity || "",
    notes: sprint?.notes || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre del sprint es requerido"
    }

    if (!formData.project) {
      newErrors.project = "Debe seleccionar un proyecto"
    }

    if (!formData.startDate) {
      newErrors.startDate = "La fecha de inicio es requerida"
    }

    if (!formData.endDate) {
      newErrors.endDate = "La fecha de fin es requerida"
    }

    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = "La fecha de fin debe ser posterior a la fecha de inicio"
    }

    if (!formData.goal.trim()) {
      newErrors.goal = "El objetivo del sprint es requerido"
    }

    if (formData.capacity && (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0)) {
      newErrors.capacity = "La capacidad debe ser un número positivo"
    }

    if (formData.teamVelocity && (isNaN(Number(formData.teamVelocity)) || Number(formData.teamVelocity) < 0)) {
      newErrors.teamVelocity = "La velocidad debe ser un número positivo o cero"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave({
        ...formData,
        capacity: formData.capacity ? Number(formData.capacity) : 0,
        teamVelocity: formData.teamVelocity ? Number(formData.teamVelocity) : 0,
      })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {sprint ? "Editar Sprint" : "Nuevo Sprint"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Sprint *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ej: Sprint 1 - Foundation"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Proyecto *</Label>
              <Select value={formData.project} onValueChange={(value) => handleChange("project", value)}>
                <SelectTrigger className={errors.project ? "border-destructive" : ""}>
                  <SelectValue placeholder="Seleccionar proyecto" />
                </SelectTrigger>
                <SelectContent>
                  {availableProjects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.project && <p className="text-sm text-destructive">{errors.project}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Objetivo del Sprint *</Label>
            <Textarea
              id="goal"
              value={formData.goal}
              onChange={(e) => handleChange("goal", e.target.value)}
              placeholder="Describe el objetivo principal y los entregables del sprint..."
              rows={2}
              className={errors.goal ? "border-destructive" : ""}
            />
            {errors.goal && <p className="text-sm text-destructive">{errors.goal}</p>}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de Inicio *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className={errors.startDate ? "border-destructive" : ""}
              />
              {errors.startDate && <p className="text-sm text-destructive">{errors.startDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha de Fin *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className={errors.endDate ? "border-destructive" : ""}
              />
              {errors.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planificado">Planificado</SelectItem>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                  <SelectItem value="Retrasado">Retrasado</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidad (horas)</Label>
              <Input
                id="capacity"
                type="number"
                min="0"
                value={formData.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
                placeholder="Ej: 80"
                className={errors.capacity ? "border-destructive" : ""}
              />
              {errors.capacity && <p className="text-sm text-destructive">{errors.capacity}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamVelocity">Velocidad del Equipo</Label>
              <Input
                id="teamVelocity"
                type="number"
                min="0"
                value={formData.teamVelocity}
                onChange={(e) => handleChange("teamVelocity", e.target.value)}
                placeholder="Ej: 45"
                className={errors.teamVelocity ? "border-destructive" : ""}
              />
              {errors.teamVelocity && <p className="text-sm text-destructive">{errors.teamVelocity}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Notas, observaciones o comentarios sobre el sprint..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {sprint ? "Actualizar" : "Crear"} Sprint
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
