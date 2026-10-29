export default function Header() {
  // Componente pequeno e reutilizável: não precisa de estado próprio.
  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="TaskFlow - início">
        <span className="brand-mark">✓</span>
        <span>task<span>flow</span></span>
      </a>
      <span className="topbar-label">PROJETO DE ESTUDO</span>
    </header>
  )
}