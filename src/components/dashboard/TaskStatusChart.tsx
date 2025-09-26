import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

type StatusData = { estado: string; cantidad: number }[];

export function TaskStatusChart({ data }: { data: { estado: string; cantidad: number }[] }) {
  // Colores accesibles para cada estado
  const statusColors: Record<string, string> = {
    "Planificado": "#60a5fa", // azul
    "En Progreso": "#f59e42", // naranja
    "Completado": "#22c55e", // verde
    "Pausado": "#f43f5e", // rojo
  };
  return (
    <div className="w-full h-64" aria-label="Gráfico de tareas por estado">
      <h3 className="text-lg font-semibold mb-2">Tareas por Estado</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} barCategoryGap={30}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="estado" tick={{ fontSize: 14 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 14 }} />
          <Tooltip
            contentStyle={{ fontSize: 14 }}
            labelStyle={{ fontWeight: "bold" }}
            formatter={(value: any) => [value, "Tareas"]}
          />
          <Legend wrapperStyle={{ fontSize: 14 }} />
          {data.map((entry, idx) => (
            <Bar
              key={entry.estado}
              dataKey="cantidad"
              name={entry.estado}
              fill={statusColors[entry.estado] || "#6366f1"}
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
              aria-label={`Barra de ${entry.estado}`}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Lista de próximos deadlines (ejemplo)
type Task = { id: string; title: string; dueDate: string };
export function UpcomingDeadlines({ tasks = [] }: { tasks: Task[] }) {
  return (
    <div aria-label="Próximos deadlines">
      <h3 className="text-lg font-semibold mb-2">Próximos Deadlines</h3>
      {tasks.length === 0 ? (
        <p className="text-muted-foreground">No hay deadlines próximos.</p>
      ) : (
        <table className="w-full text-left border-separate border-spacing-y-1">
          <thead>
            <tr>
              <th className="px-2 py-1">Tarea</th>
              <th className="px-2 py-1">Fecha límite</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                tabIndex={0}
                className="focus:outline-none focus:ring-2 focus:ring-primary rounded bg-accent/40 hover:bg-accent transition-colors"
                aria-label={`Tarea ${task.title} vence el ${new Date(task.dueDate).toLocaleDateString()}`}
              >
                <td className="font-medium px-2 py-1">{task.title}</td>
                <td className="text-sm text-muted-foreground px-2 py-1">{new Date(task.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
