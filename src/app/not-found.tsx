import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-bg-primary">
      <div className="text-center max-w-sm">
        <div className="text-8xl font-semibold text-text-dim mb-4">404</div>
        <h1 className="text-xl font-semibold mb-2">Página no encontrada</h1>
        <p className="text-text-secondary text-sm mb-8">Lo que buscas no existe o fue movido.</p>
        <Link href="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}