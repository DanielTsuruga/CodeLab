import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api.js'

export default function Register() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [role, setRole] = useState('CLIENTE')
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setOk('')
    try {
      await api.post('/api/auth/register', { login, senha, role })
      setOk('Cadastro realizado. Redirecionando para o login...')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setErro(err?.response?.data?.message || 'Erro ao cadastrar')
    }
  }

  return (
    <div className="card" style={{ maxWidth: 380, margin: '40px auto' }}>
      <h2>Cadastro</h2>
      {erro && <div className="error">{erro}</div>}
      {ok && <div style={{ color: '#16a34a', marginBottom: 12 }}>{ok}</div>}
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
        <label>Perfil</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="CLIENTE">CLIENTE</option>
          <option value="AGENTE">AGENTE</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>
      <p style={{ marginTop: 16 }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  )
}
