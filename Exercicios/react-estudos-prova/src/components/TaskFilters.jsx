export default function TaskFilters({
  busca,
  onBuscaChange,
  status,
  onStatusChange,
  prioridade,
  onPrioridadeChange,
  onClear,
}) {
  // Componente controlado: valores e mudanças são gerenciados pelo App.
  return (
    <div className="filters">
      <label className="search-field">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={busca}
          onChange={(evento) => onBuscaChange(evento.target.value)}
          placeholder="Buscar tarefa..."
          aria-label="Buscar tarefa por título ou descrição"
        />
      </label>

      <select
        value={status}
        onChange={(evento) => onStatusChange(evento.target.value)}
        aria-label="Filtrar por status"
      >
        <option>Todas</option>
        <option>Pendentes</option>
        <option>Concluídas</option>
      </select>

      <select
        value={prioridade}
        onChange={(evento) => onPrioridadeChange(evento.target.value)}
        aria-label="Filtrar por prioridade"
      >
        <option>Todas</option>
        <option>Alta</option>
        <option>Média</option>
        <option>Baixa</option>
      </select>

      <button className="clear-filters" type="button" onClick={onClear}>
        Limpar
      </button>
    </div>
  )
}