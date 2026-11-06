import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api.js'

const vazio = {
  rg: '',
  cpf: '',
  nome: '',
  endereco: '',
  profissao: '',
  login: '',
  empregadores: [],
}

export default function ClienteForm() {
  const { id } = useParams()
  const editando = !!id
  const [form, setForm] = useState(vazio)
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (editando) {
      api
        .get(`/api/clientes/${id}`)
        .then(({ data }) =>
          setForm({
            rg: data.rg || '',
            cpf: data.cpf || '',
            nome: data.nome || '',
            endereco: data.endereco || '',
            profissao: data.profissao || '',
            login: data.usuario?.login || '',
            empregadores: data.empregadores || [],
          })
        )
        .catch(() => setErro('Erro ao carregar cliente'))
    }
  }, [id, editando])

  const setCampo = (campo, valor) => setForm((f) => ({ ...f, [campo]: valor }))

  const addEmpregador = () => {
    if (form.empregadores.length >= 3) return
    setForm((f) => ({
      ...f,
      empregadores: [...f.empregadores, { nome: '', rendimento: '' }],
    }))
  }

  const setEmpregador = (i, campo, valor) => {
    setForm((f) => {
      const empregadores = [...f.empregadores]
      empregadores[i] = { ...empregadores[i], [campo]: valor }
      return { ...f, empregadores }
    })
  }

  const removeEmpregador = (i) => {
    setForm((f) => ({
      ...f,
      empregadores: f.empregadores.filter((_, idx) => idx !== i),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    const payload = {
      ...form,
      empregadores: form.empregadores.map((emp) => ({
        nome: emp.nome,
        rendimento: emp.rendimento === '' ? null : Number(emp.rendimento),
      })),
    }
    try {
      if (editando) {
        await api.put(`/api/clientes/${id}`, payload)
      } else {
        await api.post('/api/clientes', payload)
      }
      navigate('/clientes')
    } catch (err) {
      setErro(err?.response?.data?.message || 'Erro ao salvar cliente')
    }
  }

  return (
    <div className="card">
      <h2>{editando ? 'Editar Cliente' : 'Novo Cliente'}</h2>
      {erro && <div className="error">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label>Nome</label>
            <input value={form.nome} onChange={(e) => setCampo('nome', e.target.value)} required />
          </div>
          <div>
            <label>CPF</label>
            <input value={form.cpf} onChange={(e) => setCampo('cpf', e.target.value)} required />
          </div>
        </div>
        <div className="row">
          <div>
            <label>RG</label>
            <input value={form.rg} onChange={(e) => setCampo('rg', e.target.value)} />
          </div>
          <div>
            <label>Profissão</label>
            <input
              value={form.profissao}
              onChange={(e) => setCampo('profissao', e.target.value)}
            />
          </div>
        </div>
        <label>Endereço</label>
        <input value={form.endereco} onChange={(e) => setCampo('endereco', e.target.value)} />
        <label>Login do usuário (opcional)</label>
        <input value={form.login} onChange={(e) => setCampo('login', e.target.value)} />

        <h3>Empregadores (máx. 3)</h3>
        {form.empregadores.map((emp, i) => (
          <div className="row" key={i}>
            <div>
              <label>Nome</label>
              <input
                value={emp.nome}
                onChange={(e) => setEmpregador(i, 'nome', e.target.value)}
              />
            </div>
            <div>
              <label>Rendimento</label>
              <input
                type="number"
                step="0.01"
                value={emp.rendimento}
                onChange={(e) => setEmpregador(i, 'rendimento', e.target.value)}
              />
            </div>
            <div style={{ flex: '0 0 auto' }}>
              <button type="button" className="danger" onClick={() => removeEmpregador(i)}>
                Remover
              </button>
            </div>
          </div>
        ))}
        {form.empregadores.length < 3 && (
          <button type="button" className="secondary" onClick={addEmpregador}>
            + Empregador
          </button>
        )}

        <div style={{ marginTop: 16 }}>
          <button type="submit">Salvar</button>{' '}
          <button type="button" className="secondary" onClick={() => navigate('/clientes')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
