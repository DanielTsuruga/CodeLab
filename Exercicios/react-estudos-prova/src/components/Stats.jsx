export default function Stats({ total, concluidas, pendentes }) {
  // As informações chegam do componente pai por props.
  const percentual = total === 0 ? 0 : Math.round((concluidas / total) * 100)

  return (
    <section className="stats-grid" aria-label="Resumo das tarefas">
      <article className="stat-card">
        <span className="stat-label">Total de tarefas</span>
        <strong>{total}</strong>
        <span className="stat-foot">Todas as atividades</span>
      </article>
      <article className="stat-card">
        <span className="stat-label">Pendentes</span>
        <strong>{pendentes}</strong>
        <span className="stat-foot">Ainda precisam de atenção</span>
      </article>
      <article className="stat-card">
        <span className="stat-label">Concluídas</span>
        <strong>{concluidas}</strong>
        <span className="stat-foot">{percentual}% do total concluído</span>
      </article>
    </section>
  )
}