import { useState } from 'react'

const estadoInicial = {
  titulo: '',
  descricao: '',
  prioridade: 'Média',
}

export default function TaskForm({ onAdd }) {
  // Estado local: guarda os valores digitados nos campos do formulário.
  const [formulario, setFormulario] = useState(estadoInicial)
  const [erro, setErro] = useState('')

  function atualizarCampo(evento) {
    const { name, value } = evento.target

    // Spread mantém os outros campos e atualiza somente o campo alterado.
    setFormulario((atual) => ({ ...atual, [name]: value }))
  }

  function enviarFormulario(evento) {
    evento.preventDefault() // Evita que o navegador recarregue a página.
    const tituloLimpo = formulario.titulo.trim()

    if (!tituloLimpo) {
      setErro('Digite um título para a tarefa.')
      return
    }

    // Chamamos a função recebida do componente pai e limpamos os campos.
    onAdd({ ...formulario, titulo: tituloLimpo })
    setFormulario(estadoInicial)
    setErro('')
  }

  return (
    <form className="task-form" onSubmit={enviarFormulario}>
      <label htmlFor="titulo">Título <span>*</span></label>
      <input
        id="titulo"
        name="titulo"
        value={formulario.titulo}
        onChange={atualizarCampo}
        placeholder="Ex.: estudar useState"
        maxLength={80}
      />

      <label htmlFor="descricao">Descrição</label>
      <textarea
        id="descricao"
        name="descricao"
        value={formulario.descricao}
        onChange={atualizarCampo}
        placeholder="Adicione detalhes (opcional)"
        rows="3"
        maxLength={180}
      />

      <label htmlFor="prioridade">Prioridade</label>
      <select
        id="prioridade"
        name="prioridade"
        value={formulario.prioridade}
        onChange={atualizarCampo}
      >
        <option>Baixa</option>
        <option>Média</option>
        <option>Alta</option>
      </select>

      {erro && <p className="error-message" role="alert">{erro}</p>}

      <button className="button button-primary submit-button" type="submit">
        <span aria-hidden="true">＋</span> Adicionar tarefa
      </button>
    </form>
  )
}