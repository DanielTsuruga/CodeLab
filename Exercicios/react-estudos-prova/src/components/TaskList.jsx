function TaskItem({ tarefa, onToggle, onRemove }) {
  // Um componente representa uma única tarefa da lista.
  return (
    <li className={`task-item ${tarefa.concluida ? 'is-complete' : ''}`}>
      <button
        className={`check-button ${tarefa.concluida ? 'checked' : ''}`}
        type="button"
        onClick={() => onToggle(tarefa.id)}
        aria-label={tarefa.concluida ? 'Marcar como pendente' : 'Marcar como concluída'}
        title={tarefa.concluida ? 'Marcar como pendente' : 'Concluir tarefa'}
      >
        {tarefa.concluida ? '✓' : ''}
      </button>

      <div className="task-body">
        <div className="task-title-row">
          <h3>{tarefa.titulo}</h3>
          <span className={`priority priority-${tarefa.prioridade.toLowerCase()}`}>
            {tarefa.prioridade}
          </span>
        </div>
        {tarefa.descricao && <p>{tarefa.descricao}</p>}
        <span className="task-date">Criada em {tarefa.criadaEm}</span>
      </div>

      <button
        className="remove-button"
        type="button"
        onClick={() => onRemove(tarefa.id)}
        aria-label={`Excluir tarefa ${tarefa.titulo}`}
        title="Excluir tarefa"
      >
        ×
      </button>
    </li>
  )
}

export default function TaskList({ tarefas, onToggle, onRemove }) {
  // Renderização condicional: mensagem vazia ou lista de itens.
  if (tarefas.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">☷</span>
        <h3>Nenhuma tarefa encontrada</h3>
        <p>Tente mudar os filtros ou adicione uma nova tarefa.</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tarefas.map((tarefa) => (
        <TaskItem
          key={tarefa.id}
          tarefa={tarefa}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}