import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Luis Martínez",
  description: "Currículum vitae de Luis Martínez, Ingeniero de Automatización e IA.",
};

export default function CVPage() {
  return (
    <main className="fixed inset-0">
      <iframe
        src="/Luis%20Martinez%20Borges%20CV.pdf"
        className="w-full h-full border-0"
        title="CV Luis Martínez"
      />
    </main>
  );
}
