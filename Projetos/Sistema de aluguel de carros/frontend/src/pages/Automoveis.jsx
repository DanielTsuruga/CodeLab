import { useEffect, useState } from 'react'
import api from '../api.js'

const autoVazio = { matricula: '', ano: '', marca: '', modelo: '', placa: '' }

export default function Automoveis() {
  const [automoveis, setAutomoveis] = useState([])
  const [novoAuto, setNovoAuto] = useState(autoVazio)
  const [erro, setErro] = useState('')

  const carregar = async () => {
    setErro('')
    try {
      const { data } = await api.get('/api/automoveis')
      setAutomoveis(data)
    } catch {
      setErro('Erro ao carregar automóveis')
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const setAuto = (campo, valor) => setNovoAuto((a) => ({ ...a, [campo]: valor }))

  const cadastrar = async (e) => {
    e.preventDefault()
    setErro('')
    try {
      const payload = {
        ...novoAuto,
        ano: novoAuto.ano === '' ? null : Number(novoAuto.ano),
      }
      await api.post('/api/automoveis', payload)
      setNovoAuto(autoVazio)
      carregar()
    } catch {
      setErro('Erro ao cadastrar automóvel')
    }
  }

  return (
    <div>
      <h2>Automóveis</h2>
      {erro && <div className="error">{erro}</div>}

      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Placa</th>
            <th>Matrícula</th>
          </tr>
        </thead>
        <tbody>
          {automoveis.map((a) => (
            <tr key={a.id}>
              <td>{a.marca}</td>
              <td>{a.modelo}</td>
              <td>{a.ano}</td>
              <td>{a.placa}</td>
              <td>{a.matricula}</td>
            </tr>
          ))}
          {automoveis.length === 0 && (
            <tr>
              <td colSpan={5}>Nenhum automóvel cadastrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Cadastrar automóvel</h3>
        <form onSubmit={cadastrar}>
          <div className="row">
            <div>
              <label>Marca</label>
              <input value={novoAuto.marca} onChange={(e) => setAuto('marca', e.target.value)} />
            </div>
            <div>
              <label>Modelo</label>
              <input value={novoAuto.modelo} onChange={(e) => setAuto('modelo', e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div>
              <label>Ano</label>
              <input
                type="number"
                value={novoAuto.ano}
                onChange={(e) => setAuto('ano', e.target.value)}
              />
            </div>
            <div>
              <label>Placa</label>
              <input value={novoAuto.placa} onChange={(e) => setAuto('placa', e.target.value)} />
            </div>
            <div>
              <label>Matrícula</label>
              <input
                value={novoAuto.matricula}
                onChange={(e) => setAuto('matricula', e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
