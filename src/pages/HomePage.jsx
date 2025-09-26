
import { Sidebar } from "../components/sidebar";

function HomePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Bienvenido a AgilePM</h2>
          <div className="bg-card rounded-xl p-6 shadow text-card-foreground">
            Selecciona una opción en el menú lateral para comenzar.
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;