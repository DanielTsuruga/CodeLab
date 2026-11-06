import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Clientes from './pages/Clientes.jsx'
import ClienteForm from './pages/ClienteForm.jsx'
import NovoPedido from './pages/NovoPedido.jsx'
import Pedidos from './pages/Pedidos.jsx'
import Automoveis from './pages/Automoveis.jsx'

export default function App() {
  const { isAuthenticated, role } = useAuth()

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/clientes"
            element={
              <ProtectedRoute role="AGENTE">
                <Clientes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/novo"
            element={
              <ProtectedRoute role="AGENTE">
                <ClienteForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/:id"
            element={
              <ProtectedRoute role="AGENTE">
                <ClienteForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pedidos/novo"
            element={
              <ProtectedRoute role="CLIENTE">
                <NovoPedido />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <ProtectedRoute>
                <Pedidos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/automoveis"
            element={
              <ProtectedRoute role="CLIENTE">
                <Automoveis />
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <Navigate
                to={
                  !isAuthenticated
                    ? '/login'
                    : role === 'AGENTE'
                      ? '/pedidos'
                      : '/pedidos'
                }
                replace
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}
