import { useEffect, useState } from 'react'
import api from '../api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Pedidos() {
  const { role } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [erro, setErro] = useState('')

  const carregar = async () => {
    setErro('')
    try {
      const { data } = await api.get('/api/pedidos')
      setPedidos(data)
    } catch {
      setErro('Erro ao carregar pedidos')
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const cancelar = async (id) => {
    try {
      await api.put(`/api/pedidos/${id}/cancelar`)
      carregar()
    } catch (err) {
      setErro(err?.response?.data?.message || 'Erro ao cancelar')
    }
  }

  const avaliar = async (id, aprovado) => {
    try {
      await api.put(`/api/pedidos/${id}/avaliar`, null, { params: { aprovado } })
      carregar()
    } catch (err) {
      setErro(err?.response?.data?.message || 'Erro ao avaliar')
    }
  }

  return (
    <div>
      <h2>{role === 'AGENTE' ? 'Todos os Pedidos' : 'Meus Pedidos'}</h2>
      {erro && <div className="error">{erro}</div>}
      <table>
        <thead>
          <tr>
            <th>#</th>
            {role === 'AGENTE' && <th>Cliente</th>}
            <th>Automóvel</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              {role === 'AGENTE' && <td>{p.cliente?.nome}</td>}
              <td>
                {p.automovel
                  ? `${p.automovel.marca} ${p.automovel.modelo} (${p.automovel.placa})`
                  : '-'}
              </td>
              <td>{p.data}</td>
              <td>{p.status}</td>
              <td className="inline-actions">
                {role === 'CLIENTE' && p.status === 'PENDENTE' && (
                  <button className="danger" onClick={() => cancelar(p.id)}>
                    Cancelar
                  </button>
                )}
                {role === 'AGENTE' && p.status === 'PENDENTE' && (
                  <>
                    <button className="success" onClick={() => avaliar(p.id, true)}>
                      Aprovar
                    </button>
                    <button className="danger" onClick={() => avaliar(p.id, false)}>
                      Reprovar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {pedidos.length === 0 && (
            <tr>
              <td colSpan={role === 'AGENTE' ? 6 : 5}>Nenhum pedido.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
