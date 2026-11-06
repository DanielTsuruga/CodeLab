import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api.js'

const autoVazio = { matricula: '', ano: '', marca: '', modelo: '', placa: '' }

export default function NovoPedido() {
  const [automoveis, setAutomoveis] = useState([])
  const [automovelId, setAutomovelId] = useState('')
  const [novoAuto, setNovoAuto] = useState(autoVazio)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const navigate = useNavigate()

  const carregar = async () => {
    try {
      const { data } = await api.get('/api/automoveis')
      setAutomoveis(data)
      return data
    } catch {
      setErro('Erro ao carregar automóveis')
      return []
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const mensagemErro = (err, fallback) => {
    const msg = err?.response?.data?.message || ''
    if (/duplicate key|already exists|placa/i.test(msg)) {
      return 'Já existe um automóvel com essa placa.'
    }
    return msg || fallback
  }

  const cadastrarAuto = async (e) => {
    e.preventDefault()
    setErro('')
    setOk('')
    if (!novoAuto.placa.trim()) {
      setErro('Informe a placa do automóvel.')
      return
    }
    try {
      const payload = {
        ...novoAuto,
        ano: novoAuto.ano === '' ? null : Number(novoAuto.ano),
      }
      const { data } = await api.post('/api/automoveis', payload)
      setNovoAuto(autoVazio)
      const lista = await carregar()
      const criado =
        data?.id != null
          ? data
          : lista.find((a) => a.placa === payload.placa)
      if (criado?.id != null) {
        setAutomovelId(String(criado.id))
      }
      setOk('Automóvel cadastrado e selecionado.')
    } catch (err) {
      setErro(mensagemErro(err, 'Erro ao cadastrar automóvel'))
    }
  }

  const criarPedido = async () => {
    setErro('')
    setOk('')
    if (!automovelId) {
      setErro('Selecione um automóvel')
      return
    }
    try {
      await api.post('/api/pedidos', { automovelId: Number(automovelId) })
      setOk('Pedido criado com sucesso!')
      setTimeout(() => navigate('/pedidos'), 1000)
    } catch (err) {
      setErro(mensagemErro(err, 'Erro ao criar pedido'))
    }
  }

  const setAuto = (campo, valor) => setNovoAuto((a) => ({ ...a, [campo]: valor }))

  return (
    <div>
      <h2>Novo Pedido</h2>
      {erro && <div className="error">{erro}</div>}
      {ok && <div style={{ color: '#16a34a', marginBottom: 12 }}>{ok}</div>}

      <div className="card">
        <h3>Escolher automóvel</h3>
        <label>Automóvel</label>
        <select value={automovelId} onChange={(e) => setAutomovelId(e.target.value)}>
          <option value="">-- selecione --</option>
          {automoveis.map((a) => (
            <option key={a.id} value={a.id}>
              {a.marca} {a.modelo} {a.ano ? `(${a.ano})` : ''} - {a.placa}
            </option>
          ))}
        </select>
        <button onClick={criarPedido}>Criar Pedido</button>
      </div>

      <div className="card">
        <h3>Cadastrar novo automóvel</h3>
        <form onSubmit={cadastrarAuto}>
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
          <button type="submit" className="secondary">
            Cadastrar automóvel
          </button>
        </form>
      </div>
    </div>
  )
}
