import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { setBasicAuth } from '../api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const { login: doLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setBasicAuth(login, senha)
    try {
      const { data } = await api.get('/api/auth/me')
      doLogin(login, senha, data.role)
      navigate('/pedidos')
    } catch {
      setBasicAuth(null, null)
      setErro('Login ou senha inválidos')
    }
  }

  return (
    <div className="card" style={{ maxWidth: 380, margin: '40px auto' }}>
      <h2>Entrar</h2>
      {erro && <div className="error">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <label>Usuário</label>
        <input value={login} onChange={(e) => setLogin(e.target.value)} required />
        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p style={{ marginTop: 16 }}>
        Não tem conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  )
}
