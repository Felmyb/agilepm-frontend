"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { LayoutDashboard, FolderKanban, Users, CheckSquare, Calendar, Plus, Menu, X, Settings } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Proyectos", href: "/projects", icon: FolderKanban },
  { name: "Usuarios", href: "/users", icon: Users },
  { name: "Tareas", href: "/tasks", icon: CheckSquare },
  { name: "Sprints", href: "/sprints", icon: Calendar },
]
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-sidebar-border">
            <span className="text-xl font-bold tracking-tight text-sidebar-foreground">AgilePM</span>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <nav className="flex flex-col gap-1 p-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-sidebar-foreground",
                    pathname === item.href && "bg-accent text-accent-foreground",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t border-sidebar-border space-y-2">
            <Button
              className="w-full"
              size="sm"
              onClick={() => {
                navigate("/projects", { state: { openNew: true } });
                setIsOpen(false);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proyecto
            </Button>
            <div className="text-xs text-sidebar-foreground/60 text-center">v1.0.0 - Sistema de Gestión Ágil</div>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => {
                navigate("/settings");
                setIsOpen(false);
              }}
            >
              <Settings className="h-5 w-5 mr-2" />
              Configuración
            </Button>
          </div>
        </div>
      </div>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />} 
    </>
  );
}
