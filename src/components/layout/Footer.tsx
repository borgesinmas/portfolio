export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <span>&copy; {new Date().getFullYear()} Luis Martínez Borges</span>
        <div className="flex gap-6">
          <a href="mailto:agenciasuiza8@gmail.com" className="hover:text-text-primary transition-colors">Email</a>
          <a href="https://github.com/luismartinezborges" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/luismartinezborges" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}