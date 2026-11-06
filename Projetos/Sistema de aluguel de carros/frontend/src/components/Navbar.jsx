import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { isAuthenticated, role, auth, logout } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated) return null

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <strong>Aluguel de Carros</strong>
      {role === 'AGENTE' && <Link to="/clientes">Clientes</Link>}
      {role === 'CLIENTE' && <Link to="/pedidos/novo">Novo Pedido</Link>}
      {role === 'CLIENTE' && <Link to="/automoveis">Automóveis</Link>}
      <Link to="/pedidos">
        {role === 'AGENTE' ? 'Todos os Pedidos' : 'Meus Pedidos'}
      </Link>
      <span className="spacer" />
      <span>
        {auth.login} ({role})
      </span>
      <button className="secondary" onClick={handleLogout}>
        Sair
      </button>
    </nav>
  )
}
