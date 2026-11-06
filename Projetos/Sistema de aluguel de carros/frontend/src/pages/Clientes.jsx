import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api.js'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const carregar = async () => {
    setErro('')
    try {
      const { data } = await api.get('/api/clientes')
      setClientes(data)
    } catch {
      setErro('Erro ao carregar clientes')
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const excluir = async (id) => {
    if (!confirm('Excluir este cliente?')) return
    try {
      await api.delete(`/api/clientes/${id}`)
      carregar()
    } catch {
      setErro('Erro ao excluir')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Clientes</h2>
        <button onClick={() => navigate('/clientes/novo')}>Novo Cliente</button>
      </div>
      {erro && <div className="error">{erro}</div>}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Profissão</th>
            <th>Empregadores</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.cpf}</td>
              <td>{c.profissao}</td>
              <td>{(c.empregadores || []).length}</td>
              <td className="inline-actions">
                <Link to={`/clientes/${c.id}`}>
                  <button className="secondary">Editar</button>
                </Link>
                <button className="danger" onClick={() => excluir(c.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {clientes.length === 0 && (
            <tr>
              <td colSpan={5}>Nenhum cliente cadastrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
